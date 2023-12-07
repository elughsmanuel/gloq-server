import express from 'express';
import { 
    createWallet,
    getAllWallets,
    getWalletById,
    deleteWallet,
} from '../controllers/walletController';
import {
    authenticate,
    isAdmin,
} from '../../middleware/authMiddleware';

const walletRouter = express.Router();

walletRouter.post('/create-wallet', authenticate, createWallet);
walletRouter.get('/', authenticate, isAdmin, getAllWallets);
walletRouter.get('/get-wallet', authenticate, getWalletById);
walletRouter.delete('/delete-wallet', authenticate, deleteWallet);

export default walletRouter;
