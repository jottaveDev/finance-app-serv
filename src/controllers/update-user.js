import validator from 'validator'
import { badRequest, ok, serverError } from './helpers.js'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }

    async execute(httpRequest) {
        try {
            const { userId } = httpRequest.params
            const idIsValid = validator.isUUID(userId)
            if (!idIsValid) {
                return badRequest({ message: 'The provided id is not valid.' })
            }
            const userParams = httpRequest.body
            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            const someFieldIsNotAllowed = Object.keys(userParams).some(
                (key) => !allowedFields.includes(key),
            )
            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }
            if (userParams.password) {
                const passwordIsNotValid = userParams.password.length < 6
                if (passwordIsNotValid) {
                    return badRequest({
                        message: 'Password must be at least 6 characters long.',
                    })
                }
            }
            if (userParams.email) {
                const emailIsValid = validator.isEmail(userParams.email)
                if (!emailIsValid) {
                    return badRequest({
                        message: 'Email is not valid.',
                    })
                }
            }
            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                userParams,
            )
            return ok(updatedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
