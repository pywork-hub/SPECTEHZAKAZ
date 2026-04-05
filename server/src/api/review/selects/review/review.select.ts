export const REVIEW_SELECT = {
	description: true,
	filePath: true,
	rating: true,
	user: {
		select: {
			name: true,
		},
	},
	createdAt: true,
}
