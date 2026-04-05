import { useSlider } from '@/hooks/components/slider/useSlider.hook'
import type { ISlider } from '@/shared/interfaces/components/slider/slider.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import Image from '../../common/image/Image'
import styles from './Slider.module.scss'

const Slider: FC<ISlider> = ({ paths, count, className }) => {
	const { number, setIndex } = useSlider()

	return (
		<div className={formatClassName([styles.slider, className])}>
			<Image src={paths[number]} alt="" />
			{count > 1 && (
				<ul className={styles.dots} onMouseLeave={() => setIndex(0)}>
					{Array.from({ length: paths.length }).map((_, index) => (
						<li
							key={index}
							className={styles.dot}
							onMouseEnter={() => setIndex(index)}
						>
							<span className={styles.line} />
						</li>
					))}
				</ul>
			)}
			{count > 5 && number === 4 && (
				<div className={styles.area}>Еще {count - paths.length} фото</div>
			)}
		</div>
	)
}

export default Slider
