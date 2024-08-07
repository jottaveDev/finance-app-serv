import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

export class CreateUserUseCase {
    constructor(postgresCreateUserRepository) {
        this.postgresCreateUserRepository = postgresCreateUserRepository
    }

    async execute(userParams) {
        const id = uuidv4()
        const hashedPassword = await bcrypt.hash(userParams.password, 10)
        const user = {
            ...userParams,
            id,
            password: hashedPassword,
        }
        const createdUser =
            await this.postgresCreateUserRepository.execute(user)
        return createdUser
    }
}
