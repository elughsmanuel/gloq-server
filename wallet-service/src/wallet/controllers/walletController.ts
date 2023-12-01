import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { 
    createWalletSchema,
    updateWalletSchema,
} from '../../validators/walletSchema';
import WalletService from '../services/walletService';
import WalletRepository from '../repositories/walletRepository';

const walletRepository = new WalletRepository();
const walletService = new WalletService(walletRepository);

export const createWallet = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await createWalletSchema.validateAsync(req.body);

        const createWallet = await walletService.createWallet(
            schema,
        );

        return res.status(StatusCodes.OK).json(createWallet);
    } catch (error) {
        next(error);
    }
};

export const getAllWallets = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { 
            page,
            perPage,
        } = req.query;

        const wallets = await walletService.getAllWallets(
            parseFloat(page as string) || '1',
            parseFloat(perPage as string || '10'),
        );

        return res.status(StatusCodes.OK).json(wallets);
    } catch (error) {
        next(error);
    }
};

export const getWalletById = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { walletId } = req.params;

        const wallet = await walletService.getWalletById(walletId);

        return res.status(StatusCodes.OK).json(wallet);
    } catch (error) {
        next(error);
    }
};

export const updateWallet = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { walletId } = req.params;

        const schema = await updateWalletSchema.validateAsync(req.body);

        const wallet = await walletService.updateWallet(
            walletId, 
            schema,
        );

        return res.status(StatusCodes.OK).json(wallet);
    } catch (error) {
        next(error);
    }
};

export const deleteWallet = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { walletId } = req.params;

        const wallet = await walletService.deleteWallet(
            walletId, 
        );

        return res.status(StatusCodes.OK).json(wallet);
    } catch (error) {
        next(error);
    }
};
