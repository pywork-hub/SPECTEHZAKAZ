export const PUBLIC_ROUTE = {
	HOME: '/',
	REQUESTS: (categoryId?: number, region?: string) =>
		`/requests${
			categoryId || region
				? `?${[
						categoryId ? `categories=${categoryId}` : '',
						region ? `regions=${region}` : '',
				  ]
						.filter(Boolean)
						.join('&')}`
				: ''
		}`,
	ITEMS: (categoryId?: number, region?: string) =>
		`/items${
			categoryId || region
				? `?${[
						categoryId ? `categories=${categoryId}` : '',
						region ? `regions=${region}` : '',
				  ]
						.filter(Boolean)
						.join('&')}`
				: ''
		}`,
	ITEM: (id: number) => `/item/${id}`,
	POLICIES: {
		PRIVACY: '/policies/privacy',
		TERMS: '/policies/terms',
	},
	CONTACTS: '/contacts',
}

export const SECURE_ROUTE = {
	PROFILE: '/profile',
}

export const EXTERNAL_ROUTE = {
	PHONE: (phone: string) => `tel: ${phone.replace(/[^+\d]/g, '')}`,
}

export const OTHER_ROUTE = {
	PHONE: (phone: number) => `tel: ${phone}`,
	EMAIL: (email: string) => `mailto: ${email}`,
}
