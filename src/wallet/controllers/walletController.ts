import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import WalletService from '../services/walletService';
import WalletRepository from '../repositories/walletRepository';

const walletRepository = new WalletRepository();
const walletService = new WalletService(walletRepository);

export const createWallet = async (
    req: Request & {userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const createWallet = await walletService.createWallet(
            String(req.userId),
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
    req: Request & {userId?: string},
    res: Response,
    next: NextFunction,
) => {
    try {
        const wallet = await walletService.getWalletById(
            String(req.userId)
        );

        return res.status(StatusCodes.OK).json(wallet);
    } catch (error) {
        next(error);
    }
};

export const deleteWallet = async (
    req: Request & {userId?: string},
    res: Response,
    next: NextFunction,
) => {
    try {
        const wallet = await walletService.deleteWallet(
            String(req.userId)
        );

        return res.status(StatusCodes.OK).json(wallet);
    } catch (error) {
        next(error);
    }
};
