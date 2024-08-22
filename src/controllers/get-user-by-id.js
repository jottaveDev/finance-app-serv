import validator from 'validator'
import { badRequest, ok, serverError } from './helpers.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }

    async execute(httpRequest) {
        try {
            const { userId } = httpRequest.params
            const isIdValid = validator.isUUID(userId)
            if (!isIdValid) {
                return badRequest({
                    message: 'The id is invalid',
                })
            }
            const user = await this.getUserByIdUseCase.execute(userId)
            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
