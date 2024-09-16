import {
    checkIfIdIsValid,
    invalidIdResponse,
    notFound,
    ok,
    serverError,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const { transactionId } = httpRequest.params
            const idIsValid = checkIfIdIsValid(transactionId)
            if (!idIsValid) return invalidIdResponse()
            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(transactionId)
            if (!deletedTransaction)
                return notFound({ message: 'Transaction not found' })
            return ok(deletedTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
