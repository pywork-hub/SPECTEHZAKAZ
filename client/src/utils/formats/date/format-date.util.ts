export const formatDate = (
	initialDate?: Date | string | number,
	format: 'short' | 'full' = 'short'
): string => {
	if (!initialDate) return ''

	let date: Date

	if (typeof initialDate === 'number') {
		date = new Date(initialDate)
	} else if (typeof initialDate === 'string') {
		date = new Date(initialDate)
	} else if (initialDate instanceof Date) {
		date = initialDate
	} else {
		return ''
	}

	if (isNaN(date.getTime())) return ''

	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	if (format === 'short') {
		return date.toLocaleString('ru-RU', {
			timeZone,
			day: '2-digit',
			month: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		})
	}

	if (format === 'full') {
		const formatted = date.toLocaleString('ru-RU', {
			timeZone,
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		})

		const [datePart, timePart] = formatted.split(', ')
		return `${datePart} в ${timePart}`
	}

	return ''
}
