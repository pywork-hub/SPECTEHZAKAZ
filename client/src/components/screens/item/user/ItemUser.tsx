import BoxIcon from '@/components/icons/BoxIcon'
import CalendarIcon from '@/components/icons/CalendarIcon'
import StarIcon from '@/components/icons/StarIcon'
import Image from '@/components/ui/common/image/Image'
import type { ICurrentItem } from '@/shared/interfaces/api/item/item.interface'
import type { FC } from 'react'
import styles from './ItemUser.module.scss'

const ItemUser: FC<ICurrentItem> = ({ item }) => {
	return (
		<div className={styles.user}>
			<div className={styles.about}>
				<div className={styles.avatar}>
					<Image src={item.user.avatarPath} alt={item.user.name} />
				</div>
				<div className={styles.info}>
					<div className={styles.nickname}>{item.user.name}</div>
					<div className={styles.reviews}>
						<StarIcon />
						<div className={styles.box}>
							<span>{item.averageRating}</span>
							<span>{item.reviewsCount} оценки</span>
						</div>
					</div>
					<div className={styles.term}>
						<CalendarIcon />
						<span>На сайте с {item.user.createdAt}</span>
					</div>
					<div className={styles.term}>
						<BoxIcon />
						<span>Размещено: {item.user.itemsCount} объявлений</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ItemUser
