import express from 'express';
import { 
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/create-user', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/get-user/:userId', getUserById);
userRouter.patch('/update-user/:userId', updateUser);
userRouter.delete('/delete-user/:userId', deleteUser);

export default userRouter;
