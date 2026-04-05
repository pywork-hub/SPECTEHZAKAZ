import { useState } from 'react'

export const useSlider = () => {
	const [number, setIndex] = useState(0)

	return {
		number,
		setIndex,
	}
}
