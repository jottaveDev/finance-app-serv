import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresDeleteUserRepository {
    async execute(id) {
        const result = await PostgresHelper.query(
            'DELETE FROM users WHERE ID = $1',
            [id],
        )
        console.log(result)
        return result[0]
    }
}
