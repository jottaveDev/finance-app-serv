import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    ) {
        this.postgresCreateUserRepository = postgresCreateUserRepository
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository
    }

    async execute(userParams) {
        const userWithProvidedEmail =
            await this.postgresGetUserByEmailRepository.execute(
                userParams.email,
            )
        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(userParams.email)
        }
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
