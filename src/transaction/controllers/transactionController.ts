import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { recordTransactionSchema } from '../../validators/transactionSchema';
import TransactionService from '../services/transactionService';
import TransactionRepository from '../repositories/transactionRepository';
import WalletRepository from '../../wallet/repositories/walletRepository';
import UserRepository from '../../user/repositories/userRepository';

const transactionRepository = new TransactionRepository();
const walletRepository = new WalletRepository();
const userRepository = new UserRepository();

const transactionService = new TransactionService(
    transactionRepository,
    walletRepository,
    userRepository,
);

export const recordTransaction = async (
    req: Request & {userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {

        const schema = await recordTransactionSchema.validateAsync(req.body);

        const recordTransaction = await transactionService.recordTransaction(
            String(req.userId),
            schema.type,
            schema.amount,
            schema.description,
        );

        return res.status(StatusCodes.OK).json(recordTransaction);
    } catch (error) {
        next(error);
    }
};

export const getAllTransactions = async (
    req: Request & {userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { page, perPage } = req.query;

        const transactions = await transactionService.getAllTransactions(
            String(req.userId),
            parseFloat(page as string) || '1',
            parseFloat(perPage as string || '10'),
        );

        return res.status(StatusCodes.OK).json(transactions);
    } catch (error) {
        next(error);
    }
};

export const getTransactionById = async (
    req: Request & {userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { transactionId } = req.params;

        const transaction = await transactionService.getTransactionById(
            String(req.userId),
            transactionId,
        );

        return res.status(StatusCodes.OK).json(transaction);
    } catch (error) {
        next(error);
    }
};
