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
transactionRouter.get('/get-all-transactions', authenticate, getAllTransactions);
transactionRouter.get('/get-transaction/:transactionId', authenticate, getTransactionById);

export default transactionRouter;
