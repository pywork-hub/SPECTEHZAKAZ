export const DATE_VALIDATION = (name: string) => ({
	required: `${name} обязательно.`,
	validate: (value: string) => {
		if (!value || value.length < 10) {
			return 'Введите корректную дату.'
		}

		const parts = value.split('.')
		if (parts.length !== 3) {
			return 'Введите корректную дату.'
		}

		const [dayStr, monthStr, yearStr] = parts
		const day = Number(dayStr)
		const month = Number(monthStr)
		const year = Number(yearStr)

		if (
			isNaN(day) ||
			isNaN(month) ||
			isNaN(year) ||
			month < 1 ||
			month > 12 ||
			day < 1
		) {
			return 'Введите корректную дату.'
		}

		const daysInMonth = [
			31,
			year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
			31,
			30,
			31,
			30,
			31,
			31,
			30,
			31,
			30,
			31,
		]

		if (day > daysInMonth[month - 1]) {
			return 'Введите корректную дату.'
		}

		if (year < 2025 || year > 2030) {
			return 'Год должен быть в диапазоне с 2025 по 2030.'
		}

		const inputDate = new Date(year, month - 1, day)
		const today = new Date()
		today.setHours(0, 0, 0, 0)

		if (inputDate < today) {
			return 'Нельзя выбрать дату, которая уже прошла.'
		}

		return true
	},
})
