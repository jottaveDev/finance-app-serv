import { prisma } from '../../../../prisma/prisma.js'

export class PosgresUpdateTransactionRepository {
    async execute(transactionId, transactionParams) {
        return await prisma.transaction.update({
            where: {
                id: transactionId,
            },
            data: transactionParams,
        })
    }
}
