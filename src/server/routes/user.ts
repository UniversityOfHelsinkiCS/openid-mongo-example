import express from 'express'

import { RequestWithUser } from '../types'

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  const { user } = req as RequestWithUser

  if (!user?.id) return res.status(401).send('Unauthorized')

  return res.send(user)
})

export default userRouter
