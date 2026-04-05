import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useSuspenseLoader = () => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const navEntry = performance.getEntriesByType(
			'navigation'
		)[0] as PerformanceNavigationTiming
		const navType = navEntry?.type

		if (navType === 'navigate' || navType === 'reload') {
			setIsLoading(true)
			const timer = setTimeout(() => setIsLoading(false), 3000)
			return () => clearTimeout(timer)
		} else {
			setIsLoading(false)
		}
	}, [])

	// useEffect(() => {
	// 	let timeout: NodeJS.Timeout

	// 	setIsLoading(true)

	// 	timeout = setTimeout(() => {
	// 		setIsLoading(false)
	// 	}, 3000)

	// 	return () => {
	// 		clearTimeout(timeout)
	// 	}
	// }, [pathname])

	return { isLoading }
}
