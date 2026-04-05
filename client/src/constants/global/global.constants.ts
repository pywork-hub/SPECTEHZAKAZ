export const IS_SERVER = typeof window === 'undefined'
export const IS_PRODUCTION = process.env.ENV === 'production'

export const NO_INDEX_PAGE = { robots: { index: false, follow: false } }
export const WEBSITE_URL = process.env.CLIENT_URL as string

export const COMPANY_NAME = 'COMPANY'
export const EMAIL = 'support@domain.com'
