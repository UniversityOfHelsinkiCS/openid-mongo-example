import express from 'express'

import { RequestWithUser } from '../types'

const loginRouter = express.Router()

loginRouter.get('/login', async (req, res) => {
  const { user } = req as RequestWithUser

  if (!user?.id) return res.status(401).send('Unauthorized')

  return res.send(user)
})

export default loginRouter