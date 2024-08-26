import { PostgresHelper } from '../../../db/postgres/helper'

export class PostgresCreateTransactionRepository {
    async execute(transactionParams) {
        const createdTransaction = await PostgresHelper.query(
            `
            INSERT INTO transactions (id, user_id, name, date, amount, type)  
            VALUES ($1, $2, $3, $4, $5, $6)  
            RETURNING * 
            `,
            [
                transactionParams.id,
                transactionParams.user_id,
                transactionParams.name,
                transactionParams.date,
                transactionParams.amount,
                transactionParams.type,
            ],
        )
        return createdTransaction[0]
    }
}
