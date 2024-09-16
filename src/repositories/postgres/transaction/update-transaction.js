import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PosgresUpdateTransactionRepository {
    async execute(transactionId, transactionParams) {
        const updateFields = []
        const updateValues = []
        Object.keys(transactionParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(transactionParams[key])
        })
        updateValues.push(transactionId)
        const updateQuery = `
          UPDATE users
          SET ${updateFields.join(', ')}
          WHERE ID = $${updateValues.length}
          RETURNING *
        `
        const results = await PostgresHelper.query(updateQuery, updateValues)
        return results[0]
    }
}
