import Wallet, { IWallet } from '../models/walletModel';

class WalletRepository {
    async createWallet(userId: string): Promise<IWallet> {
        const wallet = await Wallet.create({
            userId: userId,
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

    async getWalletByUserId(userId: string): Promise<IWallet | null> {
        const wallet = await Wallet.findOne({userId});

        return wallet;
    }

    async getWalletById(walletId: string): Promise<IWallet | null> {
        const wallet = await Wallet.findById(walletId);

        return wallet;
    }

    async findByIdAndDelete(userId: string): Promise<IWallet | null> {
        const wallet = await Wallet.findOneAndDelete({userId});

        return wallet;
    }
}

export default WalletRepository;
