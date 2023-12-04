import express from 'express';
import { 
    createWallet,
    getAllWallets,
    getWalletById,
    updateWallet,
    deleteWallet,
} from '../controllers/walletController';

const walletRouter = express.Router();

walletRouter.post('/create-wallet', createWallet);
walletRouter.get('/', getAllWallets);
walletRouter.get('/get-wallet/:walletId', getWalletById);
walletRouter.patch('/update-wallet/:walletId', updateWallet);
walletRouter.delete('/delete-wallet/:walletId', deleteWallet);

export default walletRouter;
