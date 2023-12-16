import express from 'express';
import { 
    stockMeta,
    searchStock,
} from '../controllers/stockController';
import {
    authenticate,
} from '../../middleware/authMiddleware';

const stockRouter = express.Router();

stockRouter.get('/search/:search', authenticate, searchStock);
stockRouter.get('/meta/:ticker', authenticate, stockMeta);

export default stockRouter;
