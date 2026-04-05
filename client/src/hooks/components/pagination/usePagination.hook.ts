import { useState } from 'react'

export const usePagination = () => {
	const [page, setPage] = useState(1)

	const prev = () => setPage(page - 1)
	const next = () => setPage(page + 1)
	const goTo = (page: number) => setPage(page)
	const reset = () => setPage(1)

	return {
		page,
		prev,
		next,
		goTo,
		reset
	}
}
