import {
    CreateTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransactionController,
} from '../../controllers/index.js'
import {
    PosgresUpdateTransactionRepository,
    PostgresCreateTransactionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresGetUserByIdRepository,
} from '../../repositories/postgres/index.js'
import {
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase,
} from '../../use-cases/index.js'

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    )
    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )
    return createTransactionController
}

export const makeGetTransactionsByuserIdController = () => {
    const getTransactionsByUserIdRepository =
        new PostgresGetTransactionsByUserIdRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        getTransactionsByUserIdRepository,
        getUserByIdRepository,
    )
    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase)
    return getTransactionsByUserIdController
}

export const makeUpdateTransactionController = () => {
    const updateTransactionRepository = new PosgresUpdateTransactionRepository()
    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTransactionRepository,
    )
    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    )
    return updateTransactionController
}
