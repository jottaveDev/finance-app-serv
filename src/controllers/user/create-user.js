import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    badRequest,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    created,
    invalidEmailResponse,
    invalidPasswordResponse,
    requiredFieldIsMissingResponse,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js'

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
            const { ok: requiredFieldsWereProvided, missingField } =
                validateRequiredFields(params, requiredFields)
            if (!requiredFieldsWereProvided)
                return requiredFieldIsMissingResponse(missingField)
            const emailIsValid = checkIfEmailIsValid(params.email)
            if (!emailIsValid) return invalidEmailResponse()
            const passwordIsValid = checkIfPasswordIsValid(params.password)
            if (!passwordIsValid) return invalidPasswordResponse()
            const createdUser = await this.createUserUseCase.execute(params)
            return created(createdUser)
        } catch (error) {
            console.error(error)
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            return serverError()
        }
    }
}
