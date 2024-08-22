import 'dotenv/config.js'
import express from 'express'
import { CreateUserController } from './src/controllers/create-user.js'
import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js'
import { CreateUserUseCase } from './src/use-cases/create-user.js'

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

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})
