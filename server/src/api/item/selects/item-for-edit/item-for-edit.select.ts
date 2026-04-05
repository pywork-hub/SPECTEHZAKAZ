export const ITEM_FOR_EDIT_SELECT = {
	name: true,
	address: true,
	description: true,
	imagePaths: true,
	hourPrice: true,
	shiftPrice: true,
	minHours: true,
	properties: {
		select: {
			id: true,
			value: true,
		},
	},
	category: {
		select: {
			id: true,
			name: true,
		},
	},
}
