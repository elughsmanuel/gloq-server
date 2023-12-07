import WalletRepository from '../repositories/walletRepository';
import BadRequest from '../../errors/BadRequest';
import {
    WALLET_EXIST,
    WALLET_NOT_FOUND,
    WALLET_DELETED,
} from '../../wallet/utils/constants';

class WalletService {
    private walletRepository: WalletRepository;

    constructor(walletRepository: WalletRepository) {
        this.walletRepository = walletRepository;
    }

    async createWallet(userId: string) {
        const walletExist = await this.walletRepository.getWalletById(userId);

        if(walletExist) {
            throw new BadRequest(WALLET_EXIST);
        }

        const wallet = await this.walletRepository.createWallet(userId);

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

    async getWalletById(userId: string) {
        const wallet = await this.walletRepository.getWalletById(userId);

        if(!wallet) {
            throw new BadRequest(WALLET_NOT_FOUND);
        }

        return {
            status: true,
            data: wallet,
        }
    }

    async deleteWallet(userId: string) {
        const wallet = await this.walletRepository.getWalletById(userId);

        if(!wallet) {
            throw new BadRequest(WALLET_NOT_FOUND);
        }

        await this.walletRepository.findByIdAndDelete(userId);

        return {
            status: true,
            data: WALLET_DELETED,
        }
    }
}

export default WalletService;
