import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { recordTransactionSchema } from '../../validators/transactionSchema';
import TransactionService from '../services/transactionService';
import TransactionRepository from '../repositories/transactionRepository';
import WalletRepository from '../../wallet/repositories/walletRepository';

const transactionRepository = new TransactionRepository();
const walletRepository = new WalletRepository();
const transactionService = new TransactionService(
    transactionRepository,
    walletRepository,
);

export const recordTransaction = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {

        const schema = await recordTransactionSchema.validateAsync(req.body);

        const recordTransaction = await transactionService.recordTransaction(
            schema.walletId,
            schema.type,
            schema.amount,
            schema.description,
        );

        return res.status(StatusCodes.OK).json(recordTransaction);
    } catch (error) {
        next(error);
    }
};

// export const getAllWallets = async (
//     req: Request, 
//     res: Response,
//     next: NextFunction,
// ) => {
//     try {
//         const { 
//             page,
//             perPage,
//         } = req.query;

//         const wallets = await walletService.getAllWallets(
//             parseFloat(page as string) || '1',
//             parseFloat(perPage as string || '10'),
//         );

//         return res.status(StatusCodes.OK).json(wallets);
//     } catch (error) {
//         next(error);
//     }
// };

// export const getWalletById = async (
//     req: Request, 
//     res: Response,
//     next: NextFunction,
// ) => {
//     try {
//         const { walletId } = req.params;

//         const wallet = await walletService.getWalletById(walletId);

//         return res.status(StatusCodes.OK).json(wallet);
//     } catch (error) {
//         next(error);
//     }
// };
