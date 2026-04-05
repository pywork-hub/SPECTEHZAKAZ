'use client'

import MapIcon from '@/components/icons/MapIcon'
import PhoneIcon from '@/components/icons/PhoneIcon'
import Image from '@/components/ui/common/image/Image'
import { useSlickSlider } from '@/hooks/components/slider/useSlickSlider.hook'
import type { ICurrentItem } from '@/shared/interfaces/api/item/item.interface'
import type { FC } from 'react'
import Slider from 'react-slick'
import styles from './ItemCard.module.scss'

const ItemCard: FC<ICurrentItem> = ({ item }) => {
	const { slider, thumbnails, sliderSettings, thumbnailSettings } =
		useSlickSlider()

	return (
		<div className={styles.card}>
			<div className={styles.top}>
				<h4 className={styles.name}>{item.name}</h4>
				<p className={styles.address}>
					<MapIcon />
					<span>{item.address}</span>
				</p>
			</div>
			<div className={styles.center}>
				<div className={styles.slider}>
					<Slider ref={slider} className={styles.preview} {...sliderSettings}>
						{item.imagePaths.map((path, index) => (
							<Image key={index} src={path} alt={item.name} />
						))}
					</Slider>
					{item.imagePaths.length > 1 && (
						<Slider
							ref={thumbnails}
							className={styles.thumbnails}
							{...thumbnailSettings}
						>
							{item.imagePaths.map((path, index) => (
								<Image key={index} src={path} alt={item.name} />
							))}
						</Slider>
					)}
				</div>
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
					<div className={styles.bottom}>
						<ul className={styles.prices}>
							<li className={styles.price}>{item.hourPrice} руб./час</li>
							<li className={styles.price}>{item.shiftPrice} руб./смена</li>
						</ul>
						<button className={styles.contacts}>
							<PhoneIcon />
							<span>Посмотреть контакты</span>
						</button>
					</div>
				</div>
			</div>
			<div className={styles.description}>
				<h4 className={styles.heading}>Подробная информация</h4>
				<p className={styles.text}>{item.description}</p>
			</div>
		</div>
	)
}

export default ItemCard
