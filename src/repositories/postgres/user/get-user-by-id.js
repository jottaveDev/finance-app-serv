import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const results = await PostgresHelper.query(
            'SELECT * FROM users WHERE id = $1',
            [userId],
        )
        return results[0]
    }
}
