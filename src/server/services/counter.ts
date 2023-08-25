import { Counter } from '../db/models'

export const getCounter = async () => {
  const counter = await Counter.findById('example')

  if (!counter) throw new Error('Counter not found')

  return counter
}

export const incrementCounter = async (): Promise<number> => {
  const counter = await getCounter()

  await counter.updateOne({ value: counter.value + 1 })

  return counter.value
}

export const decrementCounter = async (): Promise<number> => {
  const counter = await getCounter()

  await counter.updateOne({ value: counter.value - 1 })

  return counter.value
}
