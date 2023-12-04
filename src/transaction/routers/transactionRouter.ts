import express from 'express';
import { 
    recordTransaction,
    getAllTransactions,
    getTransactionById,
} from '../controllers/transactionController';

const transactionRouter = express.Router();

transactionRouter.post('/record-transaction', recordTransaction);
transactionRouter.get('/get-all-transactions/:walletId', getAllTransactions);
transactionRouter.get('/get-transaction/:transactionId', getTransactionById);

export default transactionRouter;
