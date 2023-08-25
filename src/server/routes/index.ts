import express from 'express'
import cors from 'cors'

import { inDevelopment, inE2EMode } from '../../config'
import userMiddleware from '../middleware/user'
import loginRouter from './login'
import counterRouter from './counter'

const router = express()

router.use(express.json())

if (inDevelopment || inE2EMode) {
  router.use(cors())
  router.use(userMiddleware)
}

router.get('/ping', (_, res) => res.send('pong'))

router.use('/', loginRouter)
router.use('/counter', counterRouter)

export default router
