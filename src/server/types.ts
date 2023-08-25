import { Request } from 'express'

import { User } from '../types'

export interface RequestWithUser extends Request {
  user?: User
}

export interface UserInfo {
  uid: string
  hyPersonSisuId: string
  email: string
  hyGroupCn: string[]
  preferredLanguage: string
}
