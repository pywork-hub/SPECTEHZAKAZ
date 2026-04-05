import Container from '@/components/ui/common/container/Container'
import { PUBLIC_ROUTE } from '@/constants/route/route.constants'
import type { ICurrentItem } from '@/shared/interfaces/api/item/item.interface'
import type { IYandexCoordinates } from '@/shared/interfaces/common/yandex/yandex.interface'
import Link from 'next/link'
import type { FC } from 'react'
import ItemCard from './card/ItemCard'
import styles from './Item.module.scss'
import ItemReview from './review/ItemReview'
import ItemUser from './user/ItemUser'

const Item: FC<ICurrentItem & IYandexCoordinates> = ({ item, coordinates }) => {
	return (
		<section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<div className={styles.content}>
						<ItemCard item={item} />
						<div className={styles.contentReviews}>
							<ItemReview item={item} />
						</div>
					</div>
					<div className={styles.sidebar}>
						<div className={styles.head}>
							<div className={styles.number}>Объявление №{item.id}</div>
							<Link className={styles.link} href={PUBLIC_ROUTE.ITEMS()}>
								Вернуться к объявлениям
							</Link>
						</div>
						<ItemUser item={item} />
						<div className={styles.location}>
							<div className={styles.top}>
								<h4 className={styles.heading}>Адрес стоянки техники</h4>
								<p className={styles.geo}>{item.address}</p>
							</div>
							<div className={styles.map}>
								{coordinates && (
									<iframe
										width="100%"
										height="300"
										style={{ border: 0 }}
										src={`https://yandex.ru/map-widget/v1/?ll=${coordinates.lon},${coordinates.lat}&z=16&pt=${coordinates.lon},${coordinates.lat}&lang=ru_RU`}
										allowFullScreen
									/>
								)}
							</div>
						</div>
						<div className={styles.sidebarReviews}>
							<ItemReview item={item} />
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}

export default Item
