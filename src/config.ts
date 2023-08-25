export const inDevelopment = process.env.NODE_ENV === 'development'

export const inStaging = process.env.STAGING === 'true'

export const inProduction = !inStaging && process.env.NODE_ENV === 'production'

export const inE2EMode = process.env.E2E === 'true'

export const BASE_PATH = process.env.BASE_PATH || ''

export const HOST_NAME = process.env.HOST_NAME || 'http://localhost:3000'
