import 'dotenv/config.js'
import express from 'express'
import { CreateUserController } from './src/controllers/create-user.js'
import { GetUserByIdController } from './src/controllers/get-user-by-id.js'
import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js'
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js'
import { CreateUserUseCase } from './src/use-cases/create-user.js'
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'

const app = express()
app.use(express.json())

app.post('/api/users', async (request, response) => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
    )
    const createUserController = new CreateUserController(createUserUseCase)
    const { statusCode, body } = await createUserController.execute(request)
    response.status(statusCode).json(body)
})

app.get('/api/users/:userId', async (request, response) => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    )
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
    const { statusCode, body } = await getUserByIdController.execute(request)
    response.status(statusCode).json(body)
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})
