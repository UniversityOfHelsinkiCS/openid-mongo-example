import express from 'express'
import passport from 'passport'

import { RequestWithUser } from '../types'

const loginRouter = express.Router()

loginRouter.get('/login', async (req, res) => {
  const { user } = req as RequestWithUser

  if (!user?.username) return res.status(401).send('Unauthorized')

  return res.send(user)
})

loginRouter.get('/oidc', passport.authenticate('oidc'))

loginRouter.get(
  '/callback',
  passport.authenticate('oidc', { failureRedirect: '/' }),
  (_, res) => {
    res.redirect('/')
  }
)

loginRouter.get('/logout', async (req, res, next) => {
  // eslint-disable-next-line consistent-return
  req.logout((err) => {
    if (err) return next(err)
  })

  res.redirect('/')
})

export default loginRouter
