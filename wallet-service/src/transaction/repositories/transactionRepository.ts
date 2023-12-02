import Transaction, { ITransaction } from '../models/transactionModel';

class TransactionRepository {
    async recordTransaction(walletId: string, type: string, amount: number, description: string): Promise<ITransaction> {
        const transaction = await Transaction.create({
            walletId,
            type,
            amount,
            description,
        });

        return transaction;
    }

    // async getAllWallets(query: any, skip: any, perPage: any): Promise<IWallet[]> {
    //     let queryBuilder = Wallet.find(query).skip(skip).limit(perPage);

    //     const wallets = await queryBuilder.exec();
        
    //     return wallets;
    // }

    // async getTotalWalletCount(query: any): Promise<number> {

    //     return await Wallet.countDocuments(query).exec();
    // }

    // async getWalletById(walletId: string): Promise<IWallet | null> {
    //     const wallet = await Wallet.findById(walletId);

    //     return wallet;
    // }
}

export default TransactionRepository;
