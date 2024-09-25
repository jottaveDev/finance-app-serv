import { prisma } from '../../../../prisma/prisma.js'

export class PostgresCreateUserRepository {
    async execute(userParams) {
        return await prisma.user.create({
            data: {
                id: userParams.id,
                first_name: userParams.first_name,
                last_name: userParams.last_name,
                email: userParams.email,
                password: userParams.password,
            },
        })
    }
}
