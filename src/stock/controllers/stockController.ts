import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiTiingo } from '../external';

const apiTiingo = new ApiTiingo();

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
