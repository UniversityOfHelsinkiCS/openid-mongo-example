import path from 'path'

import express from 'express'
import session from 'express-session'
import passport from 'passport'

import { PORT, SESSION_SECRET } from './util/config'
import { redisStore } from './util/redis'
import { inProduction, inStaging } from '../config'
import logger from './util/logger'
import router from './routes'
import { connectToDatabase } from './db/connection'
import seed from './db/seed'
import setupAuthentication from './util/oidc'

const app = express()

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', (req, res, next) => router(req, res, next))
app.use('/api', (_, res) => res.sendStatus(404))

if (inProduction || inStaging) {
  const DIST_PATH = path.resolve(__dirname, '../../dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (_, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, async () => {
  await connectToDatabase()
  await seed()

  await setupAuthentication()

  logger.info(`Server running on port ${PORT}`)
})
