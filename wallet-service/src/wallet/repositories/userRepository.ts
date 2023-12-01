import User, { IUser } from '../models/userModel';

class UserRepository {
    async createUser(data: any): Promise<IUser> {
        const user = await User.create({
            ...data,
        });

        return user;
    }

    async getAllUsers(query: any, skip: any, perPage: any): Promise<IUser[]> {
        let queryBuilder = User.find(query).skip(skip).limit(perPage);

        const users = await queryBuilder.exec();
        
        return users;
    }

    async getTotalUserCount(query: any): Promise<number> {

        return await User.countDocuments(query).exec();
    }

    async getUserById(userId: string): Promise<IUser | null> {
        const product = await User.findById(userId);

        return product;
    }

    async updateUser(userId: string, data: any): Promise<IUser | null> {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: data },
            { new: true },
        );

        return updatedUser;
    }

    async findByIdAndDelete(userId: string): Promise<IUser | null> {
        const user = await User.findByIdAndDelete(userId);

        return user;
    }
}

export default UserRepository;
