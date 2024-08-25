import { ok, serverError } from './helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from './helpers/user.js'

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }

    async execute(httpRequest) {
        try {
            const { userId } = httpRequest.params
            const idIsValid = checkIfIdIsValid(userId)
            if (!idIsValid) return invalidIdResponse()
            await this.deleteUserUseCase.execute(userId)
            return ok({ message: 'User deleted successfully.' })
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
