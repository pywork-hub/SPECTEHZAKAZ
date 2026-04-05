export const REQUEST_FOR_EDIT_SELECT = {
	region: {
		select: {
			id: true,
			name: true,
		},
	},
	description: true,
	price: true,
	phone: true,
	pricingType: true,
	paymentMethod: true,
	quantity: true,
	startAt: true,
	status: true,
	category: {
		select: {
			id: true,
			name: true,
		},
	},
}
