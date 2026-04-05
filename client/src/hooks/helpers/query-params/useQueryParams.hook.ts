import type { IQueryParamsHook } from '@/shared/interfaces/hooks/query-params/query-params.interface'
import { useSearchParams } from 'next/navigation'

export const useQueryParams = ({ keys, redirectURL }: IQueryParamsHook) => {
	const searchParams = useSearchParams()

	const pushParams = (filters: any) => {
		const queryParams = new URLSearchParams()

		keys.forEach((key) => {
			if (!filters[key] || filters[key].length === 0) return

			const filterValues = filters[key].join(',')

			queryParams.set(key, filterValues)
		})

		const newUrl = `${window.location.pathname}?${decodeURIComponent(
			queryParams.toString()
		)}`

		if (redirectURL) {
			window.location.replace(
				`${redirectURL}?${decodeURIComponent(queryParams.toString())}`
			)
		} else {
			window.history.replaceState(null, '', newUrl)
		}
	}

	const getParams = () => {
		const queryFilters: Record<string, any> = {}

		keys.forEach((key) => {
			const paramValue = searchParams.get(key)

			if (!paramValue) return

			queryFilters[key] = paramValue.split(',')
		})

		return queryFilters
	}

	return {
		pushParams,
		getParams,
	}
}
