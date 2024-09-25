import { prisma } from '../../../../prisma/prisma.js'

export class PostgresCreateTransactionRepository {
    async execute(transactionParams) {
        return await prisma.transaction.create({ data: transactionParams })
    }
}
