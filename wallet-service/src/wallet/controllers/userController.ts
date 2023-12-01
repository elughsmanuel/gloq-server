import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { 
    createUserSchema,
    updateUserSchema,
} from '../../validators/userSchema';
import UserService from '../services/userService';
import UserRepository from '../repositories/userRepository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const createUser = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await createUserSchema.validateAsync(req.body);

        const createUser = await userService.createUser(
            schema,
        );

        return res.status(StatusCodes.OK).json(createUser);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { 
            page,
            perPage,
        } = req.query;

        const users = await userService.getAllUsers(
            parseFloat(page as string) || '1',
            parseFloat(perPage as string || '10'),
        );

        return res.status(StatusCodes.OK).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;

        const user = await userService.getUserById(userId);

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;

        const schema = await updateUserSchema.validateAsync(req.body);

        const user = await userService.updateUser(
            userId, 
            schema,
        );

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;

        const user = await userService.deleteUser(
            userId, 
        );

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};
