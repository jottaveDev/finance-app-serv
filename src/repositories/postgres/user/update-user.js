import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresUpdateUserRepository {
    async execute(userId, userParams) {
        const updateFields = []
        const updateValues = []
        Object.keys(userParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(userParams[key])
        })
        updateValues.push(userId)
        const updateQuery = `
        UPDATE users 
        SET ${updateFields.join(', ')}
        WHERE id = $${updateValues.length}
        RETURNING *
        `
        const results = await PostgresHelper.query(updateQuery, updateValues)
        return results[0]
    }
}
