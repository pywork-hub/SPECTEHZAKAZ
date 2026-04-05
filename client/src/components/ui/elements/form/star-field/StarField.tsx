import StarIcon from '@/components/icons/StarIcon'
import type { IStarField } from '@/shared/interfaces/components/star-field/star-field.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import { useState } from 'react'
import globalStyles from '../Form.module.scss'
import styles from './StarField.module.scss'

const StarField: FC<IStarField> = ({
	label,
	error,
	onChange,
	value,
	className,
}) => {
	const [hoveredStar, setHoveredStar] = useState<number | null>(null)

	return (
		<div className={formatClassName([styles.stars, className])}>
			{error && <span className={globalStyles.error}>{error.message}</span>}
			<div className={styles.box}>
				<label className={globalStyles.label}>{label}</label>
				<ul className={styles.items}>
					{[1, 2, 3, 4, 5].map((star) => (
						<li
							className={styles.item}
							key={star}
							onMouseEnter={() => setHoveredStar(star)}
							onMouseLeave={() => setHoveredStar(null)}
						>
							<button
								type="button"
								className={formatClassName([
									styles.button,
									((!!hoveredStar && star <= hoveredStar) || star <= value) &&
										styles.active,
								])}
								onClick={() => onChange(star)}
							>
								<StarIcon />
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default StarField
