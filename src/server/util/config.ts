import * as dotenv from 'dotenv'

import { inProduction } from '../../config'

dotenv.config()

export const PORT = process.env.PORT || 8000

export const DATABASE_URL = process.env.DATABASE_URL || ''

export const OIDC_ISSUER = inProduction
  ? 'https://login.helsinki.fi/.well-known/openid-configuration'
  : 'https://login-test.it.helsinki.fi/.well-known/openid-configuration'

export const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID || ''

export const OIDC_CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET || ''

export const OIDC_REDIRECT_URI = process.env.OIDC_REDIRECT_URI || ''

export const SESSION_SECRET = process.env.SESSION_SECRET || ''
