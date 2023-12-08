import express from 'express';
import { 
    recordTransaction,
    getAllTransactions,
    getTransactionById,
} from '../controllers/transactionController';
import {
    authenticate,
    isAdmin,
} from '../../middleware/authMiddleware';

const transactionRouter = express.Router();

transactionRouter.post('/record-transaction', authenticate, recordTransaction);
transactionRouter.get('/get-all-transactions/:walletId', getAllTransactions);
transactionRouter.get('/get-transaction/:transactionId', getTransactionById);

export default transactionRouter;
