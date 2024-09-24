import { ZodError } from 'zod'
import { updateUserSchema } from '../../schemas/user.js'
import {
    badRequest,
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }

    async execute(httpRequest) {
        try {
            const { userId } = httpRequest.params
            const idIsValid = checkIfIdIsValid(userId)
            if (!idIsValid) return invalidIdResponse()
            const params = httpRequest.body
            await updateUserSchema.parseAsync(params)
            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params
            )
            return ok(updatedUser)
        } catch (error) {
            console.error(error)
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            return serverError()
        }
    }
}
