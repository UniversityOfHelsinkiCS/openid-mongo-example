import { inDevelopment, inE2EMode } from '../../config'

const parseIamGroups = (iamGroups: string) =>
  iamGroups?.split(';').filter(Boolean) ?? []

const checkAdmin = (iamGroups: string[]) => iamGroups.includes('grp-toska')

const mockHeaders = {
  uid: 'testUser',
  mail: 'address@helsinki.fi',
  preferredlanguage: 'fi',
  hypersonsisuid: 'hy-hlo-123456789',
  hygroupcn: 'grp-toska;hy-employees',
}

const userMiddleware = async (req: any, _res: any, next: any) => {
  const headers = inDevelopment || inE2EMode ? mockHeaders : req.headers

  const {
    uid: username,
    mail: email,
    preferredlanguage: language,
    hypersonsisuid: id,
    hygroupcn,
  } = headers

  const iamGroups = parseIamGroups(hygroupcn)

  const user = {
    id,
    username,
    email,
    language,
    iamGroups,
    isAdmin: checkAdmin(iamGroups),
  }

  req.user = user

  return next()
}

export default userMiddleware
