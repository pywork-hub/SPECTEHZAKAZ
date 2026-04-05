import { Status } from '@/__generated__/output'
import { STATUS_LABEL } from '@/base/status/status.base'
import BoxIcon from '@/components/icons/BoxIcon'
import CalendarIcon from '@/components/icons/CalendarIcon'
import MapIcon from '@/components/icons/MapIcon'
import PhoneIcon from '@/components/icons/PhoneIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import StarIcon from '@/components/icons/StarIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import UpIcon from '@/components/icons/UpIcon'
import Image from '@/components/ui/common/image/Image'
import Slider from '@/components/ui/elements/slider/Slider'
import { PUBLIC_ROUTE } from '@/constants/route/route.constants'
import type { IItem } from '@/shared/interfaces/api/item/item.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import { formatDate } from '@/utils/formats/date/format-date.util'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './Item.module.scss'

const Item: FC<IItem> = ({
	item,
	onContacts,
	onPromote,
	onEdit,
	onDelete,
	isSecured,
	className,
}) => {
	const Wrapper = ({ children }: { children: React.ReactNode }) => {
		return isSecured ? (
			<div className={styles.link}>{children}</div>
		) : (
			<Link className={styles.link} href={PUBLIC_ROUTE.ITEM(item.id)}>
				{children}
			</Link>
		)
	}

	return (
		<li className={formatClassName([styles.item, className])}>
			<div className={styles.card}>
				<Wrapper>
					<div className={styles.top}>
						<div className={styles.head}>
							<h4 className={styles.name}>{item.name}</h4>
							{item.status && (
								<div
									className={formatClassName([
										styles.badge,
										styles[item.status],
									])}
								>
									{STATUS_LABEL[item.status]}
								</div>
							)}
						</div>
						<p className={styles.address}>
							<MapIcon />
							<span>{item.address}</span>
						</p>
					</div>
					<div className={styles.wrapper}>
						<Slider
							className={styles.image}
							paths={item.imagePaths}
							count={item.imagesCount}
						/>
						<div className={styles.content}>
							<ul className={styles.properties}>
								{item.properties.map((property, index) => (
									<li key={index} className={styles.property}>
										<span>{property.attribute.name}</span>
										<span />
										<span>{property.value}</span>
									</li>
								))}
								<li className={styles.property}>
									<span>Минимальный объем работы</span>
									<span />
									<span>{item.minHours} часов</span>
								</li>
							</ul>
							<ul className={styles.prices}>
								<li className={styles.price}>{item.hourPrice} руб./час</li>
								<li className={styles.price}>{item.shiftPrice} руб./смена</li>
							</ul>
							<div className={styles.options}>
								<div className={styles.option}>
									<span>Объявление №{item.id}</span>
								</div>
								<div className={styles.option}>
									<span>Размещено {formatDate(item.createdAt, 'full')}</span>
								</div>
							</div>
						</div>
					</div>
				</Wrapper>
				{isSecured && item.status !== Status.UnderReview && (
					<div className={styles.actions}>
						{item.status !== Status.Canceled && (
							<>
								{item.promotionExpiredAt ? (
									<div
										className={formatClassName([styles.promote, styles.active])}
									>
										<UpIcon />
										<span>Поднят</span>
									</div>
								) : (
									<button className={styles.promote} onClick={onPromote}>
										<UpIcon />
										<span>Поднять объявление</span>
									</button>
								)}
								<button className={styles.edit} onClick={onEdit}>
									<SettingsIcon />
									<span>Изменить объявление</span>
								</button>
							</>
						)}
						<button className={styles.delete} onClick={onDelete}>
							<TrashIcon />
							<span>Удалить объявление</span>
						</button>
					</div>
				)}
			</div>
			{item.user && (
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
					<button className={styles.contacts} onClick={onContacts}>
						<PhoneIcon />
						<span>Посмотреть контакты</span>
					</button>
				</div>
			)}
		</li>
	)
}

export default Item
