import UserRepository from '../repositories/userRepository';
import BadRequest from '../../errors/BadRequest';
import {
    USER_NOT_FOUND,
    USER_DELETED
} from '../../utils/constants';

class UserService {
    private userRepository: UserRepository;

    constructor(productRepository: UserRepository) {
        this.userRepository = productRepository;
    }

    async createUser(data: any) {
        const user = await this.userRepository.createUser(data);

        return { 
            success: true, 
            data: user,
        }
    }

    async getAllUsers(
        page: any,
        perPage: any,
    ) {

        // Build the query for filtering users
        let query;

        const count = await this.userRepository.getTotalUserCount(query);

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);
        
        const users = await this.userRepository.getAllUsers(query, skip, perPage);

        return {
            status: true,
            results: users.length,
            data: users,
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }

    async getUserById(userId: string) {
        const user = await this.userRepository.getUserById(userId);

        return {
            status: true,
            data: user,
        }
    }

    async updateUser(userId: string, data: any) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const updatedUser = await this.userRepository.updateUser(userId, data);

        return {
            status: true,
            data: updatedUser,
        }
    }

    async deleteUser(userId: string) {
        const user = await this.userRepository.getUserById(userId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        await this.userRepository.findByIdAndDelete(userId);

        return {
            status: true,
            data: USER_DELETED,
        }
    }
}

export default UserService;
