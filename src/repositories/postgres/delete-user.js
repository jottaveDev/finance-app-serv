import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresDeleteUserRepository {
    async execute(id) {
        return await PostgresHelper.query('DELETE FROM users WHERE ID = $1', [
            id,
        ])
    }
}
