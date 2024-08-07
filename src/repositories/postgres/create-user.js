import { PostgresHelper } from '../../db/postgres/helper'

export class PostgresCreateUserRepository {
    async execute(userParams) {
        const results = await PostgresHelper.query(
            `INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)`,
            [
                userParams.id,
                userParams.first_name,
                userParams.last_name,
                userParams.email,
                userParams.password,
            ],
        )
        return results[0]
    }
}
