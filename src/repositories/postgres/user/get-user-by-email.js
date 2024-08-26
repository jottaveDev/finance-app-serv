import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        const results = await PostgresHelper.query(
            'SELECT * FROM users WHERE email = $1',
            [email],
        )
        return results[0]
    }
}
