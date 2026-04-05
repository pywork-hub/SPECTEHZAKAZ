export const formatDate = (
	date: Date,
	format: 'short' | 'full' | 'normal' | 'other' = 'short'
): string => {
	const options: Intl.DateTimeFormatOptions =
		format === 'short'
			? {
					day: '2-digit',
					month: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
			  }
			: format === 'full'
			? {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit',
			  }
			: format === 'other'
			? {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
			  }
			: {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
			  }

	const formatted = date.toLocaleString('ru-RU', options)

	if (format === 'other') {
		const [datePart, timePart] = formatted.split(', ')
		return `${datePart} в ${timePart}`
	}

	return formatted.replace(', ', ' ')
}
