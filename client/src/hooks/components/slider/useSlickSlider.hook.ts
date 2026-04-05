import { useEffect, useRef, useState } from 'react'
import { Settings as ISliderSettings } from 'react-slick'

export const useSlickSlider = () => {
	const slider = useRef<any>(null)
	const thumbnails = useRef<any>(null)

	const [nav1, setNav1] = useState<any>(null)
	const [nav2, setNav2] = useState<any>(null)

	useEffect(() => {
		setNav1(slider.current)
		setNav2(thumbnails.current)
	}, [])

	const sliderSettings: ISliderSettings = {
		asNavFor: nav2,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		draggable: true,
	}

	const thumbnailSettings: ISliderSettings = {
		asNavFor: nav1,
		slidesToShow: 3,
		swipeToSlide: true,
		arrows: false,
		infinite: false,
		focusOnSelect: true,
		draggable: true,
	}

	return {
		slider,
		thumbnails,
		sliderSettings,
		thumbnailSettings,
	}
}
