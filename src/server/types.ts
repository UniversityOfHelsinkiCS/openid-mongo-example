import { Request } from 'express'

import { User } from '../types'

export interface RequestWithUser extends Request {
  user?: User
}
