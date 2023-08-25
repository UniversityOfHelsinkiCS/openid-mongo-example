import express from 'express'

import {
  getCounter,
  incrementCounter,
  decrementCounter,
} from '../services/counter'

const counterRouter = express.Router()

counterRouter.get('/', async (_, res) => {
  const counter = await getCounter()

  return res.send(counter)
})

counterRouter.post('/increment', async (_, res) => {
  const value = await incrementCounter()

  return res.send({ value })
})

counterRouter.post('/decrement', async (_, res) => {
  const value = await decrementCounter()

  return res.send({ value })
})

export default counterRouter
