import Transaction, { ITransaction } from '../models/transactionModel';

class TransactionRepository {
    async recordTransaction(walletId: string, type: string, amount: number, description: string): Promise<ITransaction> {
        const transaction = await Transaction.create({
            walletId,
            type,
            amount,
            description,
        });

        return transaction;
    }

    async getAllTransactions(walletId: string, skip: any, perPage: any): Promise<ITransaction[]> {
        let queryBuilder = Transaction.find({walletId}).skip(skip).limit(perPage);

        const transactions = await queryBuilder.exec();
        
        return transactions;
    }

    async getTotalTransactionCount(query: any): Promise<number> {

        return await Transaction.countDocuments(query).exec();
    }

    async getTransactionById(walletId: string, transactionId: string): Promise<ITransaction | null> {
        const transaction = await Transaction.findOne(
            {
                walletId: walletId,
                _id: transactionId,
            }
        );

        return transaction;
    }
}

export default TransactionRepository;
