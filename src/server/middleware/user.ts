const mockUser = {
  id: 'hy-hlo-123456789',
  username: 'testUser',
  email: 'address@helsinki.fi',
  language: 'fi',
  isAdmin: true,
  iamGroups: ['grp-toska', 'hy-employees'],
}

const userMiddleware = (req: any, _: any, next: any) => {
  req.user = mockUser

  return next()
}

export default userMiddleware
