import express from 'express';
import { 
    stockMeta
} from '../controllers/stockController';
import {
    authenticate,
} from '../../middleware/authMiddleware';

const stockRouter = express.Router();

stockRouter.get('/meta/:ticker', authenticate, stockMeta);

export default stockRouter;
