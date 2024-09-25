import { ZodError } from 'zod'
import { createTransactionSchema } from '../../schemas/transaction.js'
import { badRequest, created, serverError } from '../helpers/http.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            await createTransactionSchema.parseAsync(params)
            const transaction = await this.createTransactionUseCase.execute(
                params
            )
            return created(transaction)
        } catch (error) {
            console.error(error)
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            return serverError()
        }
    }
}
