import { badRequest } from './http.js'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 characters',
    })

export const invalidEmailResponse = () =>
    badRequest({ message: 'Invalid email' })

export const userNotFoundResponse = () =>
    badRequest({ message: 'User not found' })
