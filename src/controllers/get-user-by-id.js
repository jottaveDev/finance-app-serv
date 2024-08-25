import { notFound, ok, serverError } from './helpers.js'
import { checkIfIdIsValid, invalidIdResponse } from './helpers/user.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }

    async execute(httpRequest) {
        try {
            const { userId } = httpRequest.params
            const isIdValid = checkIfIdIsValid(userId)
            if (!isIdValid) invalidIdResponse()
            const user = await this.getUserByIdUseCase.execute(userId)
            if (!user) {
                return notFound({ message: 'User not found' })
            }
            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
