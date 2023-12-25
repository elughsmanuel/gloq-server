import express from 'express';
import { 
    stockMeta,
    searchStock,
    dailyStock,
} from '../controllers/stockController';
import {
    authenticate,
} from '../../middleware/authMiddleware';

const stockRouter = express.Router();

stockRouter.get('/search/:search', authenticate, searchStock);
stockRouter.get('/meta/:ticker', authenticate, stockMeta);
stockRouter.get('/daily-stock/:ticker', authenticate, dailyStock);

export default stockRouter;
