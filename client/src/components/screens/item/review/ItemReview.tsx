'use client'

import Review from '@/components/parts/review/Review'
import Loader from '@/components/ui/common/loader/Loader'
import StarField from '@/components/ui/elements/form/star-field/StarField'
import Textarea from '@/components/ui/elements/form/textarea/Textarea'
import Pagination from '@/components/ui/elements/pagination/Pagination'
import { useUser } from '@/context/user/user.context'
import { useLeaveReview } from '@/hooks/api/review/useLeaveReview.hook'
import { useReviews } from '@/hooks/api/review/useReviews.hook'
import type { ICurrentItem } from '@/shared/interfaces/api/item/item.interface'
import { LENGTH_VALIDATION } from '@/validations/length.validation'
import { REQUIRED_VALIDATION } from '@/validations/required.validation'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from './ItemReview.module.scss'

const ItemReview: FC<ICurrentItem> = ({ item, className }) => {
	const { reviews, pages, isReviewsLoading, pagination } = useReviews({ item })

	const { register, control, handleSubmit, onSubmit, errors, isLoading } =
		useLeaveReview({ item })

	const { user } = useUser()

	return (
		<>
			{isReviewsLoading ? (
				<div className={styles.content}>
					<Loader className={styles.loader} />
				</div>
			) : (
				reviews.length > 0 && (
					<div className={styles.fill}>
						<ul className={styles.reviews}>
							{reviews.map((review, index) => (
								<Review key={index} review={review} />
							))}
						</ul>
						{pages > 1 && (
							<Pagination
								className={styles.pagination}
								pages={pages}
								{...pagination}
							/>
						)}
					</div>
				)
			)}
			{!!user && (
				<div className={styles.box}>
					<h4 className={styles.heading}>
						Оставить отзыв исполнителю
					</h4>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<Textarea
							{...register(
								'description',
								LENGTH_VALIDATION('Описание', 30, 500)
							)}
							className={styles.field}
							textareaClassName={styles.textarea}
							placeholder="Текст отзыва"
							error={errors.description}
						/>
						<Controller
							name="rating"
							control={control}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => (
								<StarField
									className={styles.stars}
									label="Ваша оценка:"
									error={error}
									onChange={onChange}
									value={value}
								/>
							)}
							rules={REQUIRED_VALIDATION('Оценка')}
						/>
						{isLoading ? (
							<div className={styles.submit}>
								<Loader className={styles.loader} />
							</div>
						) : (
							<button className={styles.submit}>Отправить</button>
						)}
					</form>
				</div>
			)}
		</>
	)
}

export default ItemReview
