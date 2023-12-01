import WalletRepository from '../repositories/walletRepository';
import BadRequest from '../../errors/BadRequest';
import {
    WALLET_NOT_FOUND,
    WALLET_DELETED
} from '../../utils/constants';

class WalletService {
    private walletRepository: WalletRepository;

    constructor(walletRepository: WalletRepository) {
        this.walletRepository = walletRepository;
    }

    async createWallet(data: any) {
        const wallet = await this.walletRepository.createWallet(data);

        return { 
            success: true, 
            data: wallet,
        }
    }

    async getAllWallets(
        page: any,
        perPage: any,
    ) {

        // Build the query for filtering wallets
        let query;

        const count = await this.walletRepository.getTotalWalletCount(query);

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);
        
        const wallets = await this.walletRepository.getAllWallets(query, skip, perPage);

        return {
            status: true,
            results: wallets.length,
            data: wallets,
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }

    async getWalletById(walletId: string) {
        const wallet = await this.walletRepository.getWalletById(walletId);

        return {
            status: true,
            data: wallet,
        }
    }

    async updateWallet(walletId: string, data: any) {
        const wallet = await this.walletRepository.getWalletById(walletId);

        if(!wallet) {
            throw new BadRequest(WALLET_NOT_FOUND);
        }

        const updatedWallet = await this.walletRepository.updateWallet(walletId, data);

        return {
            status: true,
            data: updatedWallet,
        }
    }

    async deleteWallet(walletId: string) {
        const wallet = await this.walletRepository.getWalletById(walletId);

        if(!wallet) {
            throw new BadRequest(WALLET_NOT_FOUND);
        }

        await this.walletRepository.findByIdAndDelete(walletId);

        return {
            status: true,
            data: WALLET_DELETED,
        }
    }
}

export default WalletService;
