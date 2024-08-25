import { badRequest, ok, serverError } from './helpers.js'
import {
    checkIfEmailIsValid,
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    invalidEmailResponse,
    invalidIdResponse,
    invalidPasswordResponse,
} from './helpers/user.js'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }

    async execute(httpRequest) {
        try {
            const { userId } = httpRequest.params
            const idIsValid = checkIfIdIsValid(userId)
            if (!idIsValid) invalidIdResponse()
            const params = httpRequest.body
            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            const someFieldIsNotAllowed = Object.keys(params).some(
                (key) => !allowedFields.includes(key),
            )
            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }
            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)
                if (!passwordIsValid) invalidPasswordResponse()
            }
            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)
                if (!emailIsValid) invalidEmailResponse()
            }
            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )
            return ok(updatedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
