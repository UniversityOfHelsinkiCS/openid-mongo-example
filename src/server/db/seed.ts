import logger from '../util/logger'
import { Counter } from './models'

const seed = async () => {
  try {
    const counter = await Counter.findById('example')

    if (!counter) {
      await Counter.create({
        _id: 'example',
        value: 0,
      })
    }

    logger.info('Seeding successful')
  } catch (e) {
    logger.error('Seeding failed: ', e)
  }
}

export default seed
