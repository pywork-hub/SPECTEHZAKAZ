import { useEffect, useRef, useState } from 'react'

export const useOutside = <T extends HTMLElement>() => {
	const [isShow, setIsShow] = useState(false)

	const buttonRef = useRef<HTMLButtonElement>(null)
	const ref = useRef<T>(null)

	const handleClickOutside = (event: any) => {
		if (!ref.current || !buttonRef.current) return

		if (
			!ref.current.contains(event.target) &&
			!buttonRef.current.contains(event.target)
		) {
			setIsShow(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return { isShow, setIsShow, ref, buttonRef }
}
