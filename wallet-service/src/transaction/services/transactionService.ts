import TransactionRepository from '../repositories/transactionRepository';
import WalletRepository from '../../wallet/repositories/walletRepository';
import BadRequest from '../../errors/BadRequest';
import {
    WALLET_NOT_FOUND,
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
                    data: 'INSUFFICIENT FUNDS',
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

    // async getAllWallets(
    //     page: any,
    //     perPage: any,
    // ) {

    //     // Build the query for filtering wallets
    //     let query;

    //     const count = await this.walletRepository.getTotalWalletCount(query);

    //     // Calculate pagination values
    //     const skip = (page - 1) * perPage;
    //     const currentPage = Math.ceil(page);
    //     const totalPages = Math.ceil(count / perPage);
        
    //     const wallets = await this.walletRepository.getAllWallets(query, skip, perPage);

    //     return {
    //         status: true,
    //         results: wallets.length,
    //         data: wallets,
    //         currentPage: currentPage,
    //         totalPages: totalPages,
    //     }
    // }

    // async getWalletById(walletId: string) {
    //     const wallet = await this.walletRepository.getWalletById(walletId);

    //     return {
    //         status: true,
    //         data: wallet,
    //     }
    // }
}

export default TransactionService;
