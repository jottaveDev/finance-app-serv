import validator from 'validator'
import { badRequest, notFound, ok, serverError } from './helpers.js'

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
