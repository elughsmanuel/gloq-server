import TransactionRepository from '../repositories/transactionRepository';
import WalletRepository from '../../wallet/repositories/walletRepository';
import BadRequest from '../../errors/BadRequest';
import {
    WALLET_NOT_FOUND,
    INSUFFICIENT_FUNDS,
} from '../../utils/constants';

class TransactionService {
    private transactionRepository: TransactionRepository;
    private walletRepository: WalletRepository;

    constructor(
        transactionRepository: TransactionRepository,
        walletRepository: WalletRepository,
    ) {
        this.transactionRepository = transactionRepository;
        this.walletRepository = walletRepository;
    }

    async recordTransaction(walletId: string, type: string, amount: number, description: string) {
        const wallet = await this.walletRepository.getWalletById(walletId);

        if (!wallet) {
            throw new BadRequest(WALLET_NOT_FOUND);
        }

        const transaction = await this.transactionRepository.recordTransaction(walletId, type, amount, description);

        if(type === 'credit') {
            wallet.balance += amount;
        }
        
        if (type === 'debit') {
            if (wallet.balance < amount) {
                return { 
                    success: true, 
                    data: INSUFFICIENT_FUNDS,
                }
            }

            wallet.balance -= amount;
        }

        await wallet.save();

        return { 
            success: true, 
            data: {
                transaction,
                wallet,
            },
        }
    }

    async getAllTransactions(walletId: string, page: any, perPage: any) {

        // Build the query for filtering transactions
        let query;

        const count = await this.transactionRepository.getTotalTransactionCount(query);

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);
        
        const transactions = await this.transactionRepository.getAllTransactions(walletId, skip, perPage);

        return {
            status: true,
            results: transactions.length,
            data: transactions,
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }

    async getTransactionById(transactionId: string) {
        const transaction = await this.transactionRepository.getTransactionById(transactionId);

        return {
            status: true,
            data: transaction,
        }
    }
}

export default TransactionService;
