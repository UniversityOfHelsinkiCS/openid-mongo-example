import {
  Issuer,
  Strategy,
  TokenSet,
  UnknownObject,
  UserinfoResponse,
} from 'openid-client'
import passport from 'passport'

import { inE2EMode } from '../../config'
import {
  OIDC_ISSUER,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_REDIRECT_URI,
} from './config'
import { User as UserType } from '../../types'
import { UserInfo } from '../types'
import { User } from '../db/models'

const params = {
  claims: {
    id_token: {
      uid: { essential: true },
      hyPersonSisuId: { essential: true },
    },
    userinfo: {
      email: { essential: true },
      hyGroupCn: { essential: true },
      preferredLanguage: null,
    },
  },
}

const checkAdmin = (iamGroups: string[]) => iamGroups.includes('grp-toska')

const getClient = async () => {
  const issuer = await Issuer.discover(OIDC_ISSUER)

  const client = new issuer.Client({
    client_id: OIDC_CLIENT_ID,
    client_secret: OIDC_CLIENT_SECRET,
    redirect_uris: [OIDC_REDIRECT_URI],
    response_types: ['code'],
  })

  return client
}

const verifyLogin = async (
  _tokenSet: TokenSet,
  userinfo: UserinfoResponse<UnknownObject, UnknownObject>,
  done: (err: any, user?: unknown) => void
) => {
  const {
    uid: username,
    hyPersonSisuId: id,
    email,
    hyGroupCn: iamGroups,
    preferredLanguage: language,
  } = userinfo as unknown as UserInfo

  const user: UserType = {
    username,
    id: id || username,
    email,
    iamGroups,
    language,
    isAdmin: checkAdmin(iamGroups),
  }

  await User.findOneAndUpdate({ username }, { ...user }, { upsert: true })

  done(null, user)
}

const setupAuthentication = async () => {
  if (inE2EMode) return

  const client = await getClient()

  passport.serializeUser((user, done) => {
    const { username, iamGroups, isAdmin } = user as UserType

    return done(null, { username, iamGroups, isAdmin })
  })

  passport.deserializeUser(
    async (
      { username, iamGroups }: { username: string; iamGroups: string[] },
      done
    ) => {
      const user = await User.findOne({ username })

      console.log({ ...user, iamGroups })

      if (!user) return done(new Error('User not found'))

      return done(null, { ...user, iamGroups })
    }
  )

  passport.use('oidc', new Strategy({ client, params }, verifyLogin))
}

export default setupAuthentication
