import validator from 'validator'
import { badRequest, created, serverError } from './helpers.js'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` })
                }
            }
            const emailIsValid = validator.isEmail(params.email)
            if (!emailIsValid) {
                return badRequest({ message: 'Invalid email' })
            }
            if (params.password.length < 6) {
                return badRequest({
                    message: 'Password must be at least 6 characters',
                })
            }
            const createdUser = await this.createUserUseCase.execute(params)
            return created(createdUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
