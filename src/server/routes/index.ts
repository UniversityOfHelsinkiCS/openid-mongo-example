import express from 'express'
import cors from 'cors'

import { inDevelopment } from '../../config'
import shibbolethMiddleware from '../middleware/shibboleth'
import userMiddleware from '../middleware/user'
import loginRouter from './login'
import counterRouter from './counter'

const router = express()

if (inDevelopment) router.use(cors())

router.use(express.json())

router.use(shibbolethMiddleware)
router.use(userMiddleware)

router.get('/ping', (_, res) => res.send('pong'))

router.use('/', loginRouter)
router.use('/counter', counterRouter)

export default router
