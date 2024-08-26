import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresDeleteUserRepository {
    async execute(id) {
        const deletedUser = await PostgresHelper.query(
            'DELETE FROM users WHERE ID = $1 RETURNING *',
            [id],
        )
        return deletedUser[0]
    }
}
