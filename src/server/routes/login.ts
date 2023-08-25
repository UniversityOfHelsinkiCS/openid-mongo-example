import express from 'express'

import { RequestWithUser } from '../types'
// import { User } from '../db/models'

const loginRouter = express.Router()

loginRouter.get('/login', async (req, res) => {
  const { user } = req as RequestWithUser

  if (!user?.id) return res.status(401).send('Unauthorized')

  // await User.findByIdAndUpdate(user.id, user)

  return res.send(user)
})

export default loginRouter
