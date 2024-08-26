import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class UpdateUserUseCase {
    constructor(postgresUpdateUserRepository, getUserByEmailRepository) {
        this.postgresUpdateUserRepository = postgresUpdateUserRepository
        this.getUserByEmailRepository = getUserByEmailRepository
    }

    async execute(userId, userParams) {
        if (userParams.email) {
            const userWithProvidedEmail =
                await this.getUserByEmailRepository.execute(userParams.email)
            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(userParams.email)
            }
        }
        const user = { ...userParams }
        if (userParams.password) {
            const hashedPassword = await bcrypt.hash(userParams.password, 10)
            user.password = hashedPassword
        }
        const updatedUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user,
        )
        return updatedUser
    }
}
