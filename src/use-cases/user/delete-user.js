export class DeleteUserUseCase {
    constructor(postgresDeleteUserRepository) {
        this.postgresDeleteUserRepository = postgresDeleteUserRepository
    }

    async execute(id) {
        return await this.postgresDeleteUserRepository.execute(id)
    }
}
