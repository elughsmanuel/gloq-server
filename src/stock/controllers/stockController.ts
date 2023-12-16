import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiTiingo } from '../external';

const apiTiingo = new ApiTiingo();

export const searchStock = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { search } = req.params;

        const stock = await apiTiingo.searchStock(
            String(search)
        );

        return res.status(StatusCodes.OK).json({
            success: true,
            data: stock,
        });
    } catch (error) {
        next(error);
    }
};

export const stockMeta = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { ticker } = req.params;

        const meta = await apiTiingo.stockMeta(
            String(ticker)
        );

        return res.status(StatusCodes.OK).json({
            success: true,
            data: meta,
        });
    } catch (error) {
        next(error);
    }
};
