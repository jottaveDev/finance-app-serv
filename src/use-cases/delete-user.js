import { notFound } from '../controllers/helpers/http'

export class DeleteUserUseCase {
    constructor(postgresDeleteUserRepository, postgresGetUserByIdRepository) {
        this.postgresDeleteUserRepository = postgresDeleteUserRepository
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
    }

    async execute(id) {
        const idExists = await this.postgresGetUserByIdRepository.execute(id)
        if (!idExists) {
            return notFound({ message: 'User not found.' })
        }
        return await this.postgresDeleteUserRepository.execute(id)
    }
}
