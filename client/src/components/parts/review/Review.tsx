import StarIcon from '@/components/icons/StarIcon'
import type { IReview } from '@/shared/interfaces/api/review/review.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './Review.module.scss'

const Review: FC<IReview> = ({ review, className }) => {
	return (
		<li className={formatClassName([styles.review, className])}>
			<div className={styles.top}>
				<div className={styles.head}>
					<div className={styles.name}>{review.name}</div>
					<ul className={styles.stars}>
						{Array.from({ length: review.rating }).map((star, index) => (
							<li key={index} className={styles.star}>
								<StarIcon />
							</li>
						))}
					</ul>
				</div>
				<span className={styles.created}>{review.createdAt}</span>
			</div>
			<p className={styles.description}>{review.description}</p>
		</li>
	)
}

export default Review
