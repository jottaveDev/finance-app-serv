import { v4 as uuidv4 } from 'uuid'
import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(transactionParams) {
        const userId = transactionParams.user_id
        const user = await this.getUserByIdRepository.execute(userId)
        if (!user) {
            throw new UserNotFoundError(userId)
        }
        const transactionId = uuidv4()
        const transaction = await this.createTransactionRepository.execute({
            ...transactionParams,
            id: transactionId,
        })
        return transaction
    }
}
