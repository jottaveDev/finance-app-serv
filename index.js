import 'dotenv/config.js'
import express from 'express'
import { CreateUserController } from './src/controllers/create-user.js'
import { GetUserByIdController } from './src/controllers/get-user-by-id.js'
import { UpdateUserController } from './src/controllers/update-user.js'
import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from './src/repositories/postgres/get-user-by-email.js'
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js'
import { PostgresUpdateUserRepository } from './src/repositories/postgres/update-user.js'
import { CreateUserUseCase } from './src/use-cases/create-user.js'
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'
import { UpdateUserUseCase } from './src/use-cases/update-user.js'

const app = express()
app.use(express.json())

app.post('/api/users', async (request, response) => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()
    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    )
    const createUserController = new CreateUserController(createUserUseCase)
    const { statusCode, body } = await createUserController.execute(request)
    response.status(statusCode).json(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const posgtresUpdateUserRepository = new PostgresUpdateUserRepository()
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()
    const updateUserUseCase = new UpdateUserUseCase(
        posgtresUpdateUserRepository,
        postgresGetUserByEmailRepository,
    )
    const updateUserController = new UpdateUserController(updateUserUseCase)
    const { statusCode, body } = await updateUserController.execute(request)
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
