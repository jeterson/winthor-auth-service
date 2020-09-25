import { Router, request } from 'express'
import {authRoutes} from './routers'

const router = Router()

router.use('/auth', authRoutes)

export { router }
