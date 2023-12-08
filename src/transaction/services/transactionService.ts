import TransactionRepository from '../repositories/transactionRepository';
import WalletRepository from '../../wallet/repositories/walletRepository';
import UserRepository from '../../user/repositories/userRepository';
import BadRequest from '../../errors/BadRequest';
import {
    WALLET_NOT_FOUND,
    INSUFFICIENT_FUNDS,
    USER_NOT_FOUND,
    TRANSACTION_NOT_FOUND,
} from '../utils/constants';

class TransactionService {
    private transactionRepository: TransactionRepository;
    private walletRepository: WalletRepository;
    private userRepository: UserRepository;

    constructor(
        transactionRepository: TransactionRepository,
        walletRepository: WalletRepository,
        userRepository: UserRepository,
    ) {
        this.transactionRepository = transactionRepository;
        this.walletRepository = walletRepository;
        this.userRepository = userRepository;
    }

    async recordTransaction(userId: string, type: string, amount: number, description: string) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const wallet = await this.walletRepository.getWalletByUserId(userId);

        if (!wallet) {
            throw new BadRequest(WALLET_NOT_FOUND);
        }

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

        const walletId = wallet._id.toString();

        const transaction = await this.transactionRepository.recordTransaction(walletId, type, amount, description);

        return { 
            success: true, 
            data: {
                transaction,
                wallet,
            },
        }
    }

    async getAllTransactions(userId: string, page: any, perPage: any) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const wallet = await this.walletRepository.getWalletByUserId(userId);

        if (!wallet) {
            throw new BadRequest(WALLET_NOT_FOUND);
        }

        // Build the query for filtering transactions
        let query;

        const count = await this.transactionRepository.getTotalTransactionCount(query);

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);

        const walletId = wallet._id.toString();
        
        const transactions = await this.transactionRepository.getAllTransactions(walletId, skip, perPage);

        return {
            status: true,
            results: transactions.length,
            data: transactions,
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }

    async getTransactionById(userId: string, transactionId: string) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const wallet = await this.walletRepository.getWalletByUserId(userId);

        if (!wallet) {
            throw new BadRequest(WALLET_NOT_FOUND);
        }

        const walletId = wallet._id.toString();

        const transaction = await this.transactionRepository.getTransactionById(walletId, transactionId);

        if(!transaction) {
            throw new BadRequest(TRANSACTION_NOT_FOUND);
        }

        return {
            status: true,
            data: transaction,
        }
    }
}

export default TransactionService;
