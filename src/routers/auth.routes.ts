import { Router, response } from 'express'
import { authController } from '@useCase/Auth'
const authRoutes = Router()


authRoutes.post('/login', (req, res) => {
    return authController.login(req, res)
})

authRoutes.post('/validate_token', (req, res) => {
    return authController.validateToken(req, res)
})


export { authRoutes }

