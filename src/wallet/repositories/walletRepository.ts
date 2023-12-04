import Wallet, { IWallet } from '../models/walletModel';

class WalletRepository {
    async createWallet(data: any): Promise<IWallet> {
        const wallet = await Wallet.create({
            ...data,
        });

        return wallet;
    }

    async getAllWallets(query: any, skip: any, perPage: any): Promise<IWallet[]> {
        let queryBuilder = Wallet.find(query).skip(skip).limit(perPage);

        const wallets = await queryBuilder.exec();
        
        return wallets;
    }

    async getTotalWalletCount(query: any): Promise<number> {

        return await Wallet.countDocuments(query).exec();
    }

    async getWalletById(walletId: string): Promise<IWallet | null> {
        const wallet = await Wallet.findById(walletId);

        return wallet;
    }

    async updateWallet(walletId: string, data: any): Promise<IWallet | null> {
        const updatedWallet = await Wallet.findByIdAndUpdate(
            walletId,
            { $set: data },
            { new: true },
        );

        return updatedWallet;
    }

    async findByIdAndDelete(walletId: string): Promise<IWallet | null> {
        const wallet = await Wallet.findByIdAndDelete(walletId);

        return wallet;
    }
}

export default WalletRepository;
