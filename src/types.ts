export interface User {
  id: string
  username: string
  language?: string
  email?: string
  iamGroups: string[]
  isAdmin: boolean
}

export interface Counter {
  id: string
  value: number
}
