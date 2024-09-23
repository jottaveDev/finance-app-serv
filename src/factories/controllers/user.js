import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/index.js'
import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserBalanceRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js'
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserBalanceUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from '../../use-cases/index.js'

export const makeGetUserByIdController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository
    )
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
    return getUserByIdController
}

export const makeCreateUserController = () => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()
    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository
    )
    const createUserController = new CreateUserController(createUserUseCase)
    return createUserController
}

export const makeUpdateUserController = () => {
    const posgtresUpdateUserRepository = new PostgresUpdateUserRepository()
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()
    const updateUserUseCase = new UpdateUserUseCase(
        posgtresUpdateUserRepository,
        postgresGetUserByEmailRepository
    )
    const updateUserController = new UpdateUserController(updateUserUseCase)
    return updateUserController
}

export const makeDeleteUserController = () => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()
    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
        postgresGetUserByIdRepository
    )
    const deleteUserController = new DeleteUserController(deleteUserUseCase)
    return deleteUserController
}

export const makeGetUserBalanceController = () => {
    const getUserBalanceRepository = new PostgresGetUserBalanceRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        getUserBalanceRepository,
        getUserByIdRepository
    )
    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase
    )
    return getUserBalanceController
}
