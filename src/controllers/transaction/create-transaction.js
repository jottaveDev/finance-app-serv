import validator from 'validator'
import { badRequest, created, serverError } from '../helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/user.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']
            for (const field of requiredFields) {
                if (!params[field] || field.toString().trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` })
                }
            }
            const isValidID = checkIfIdIsValid(params.user_id)
            if (!isValidID) return invalidIdResponse()
            if (params.amount <= 0)
                return badRequest({
                    message: 'The amount must be greater than 0.',
                })
            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                },
            )
            if (!amountIsValid)
                return badRequest({
                    message: 'The amount must be a valid currency.',
                })
            const type = params.type.trim().toUpperCase()
            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(
                type,
            )
            if (!typeIsValid) {
                return badRequest({
                    message:
                        'The type must be EARNING, EXPENSE or INVESTIMENT.',
                })
            }
            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            })
            return created(transaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
