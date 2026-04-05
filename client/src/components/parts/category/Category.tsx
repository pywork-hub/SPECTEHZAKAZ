import MoveRightIcon from '@/components/icons/MoveRightIcon'
import Image from '@/components/ui/common/image/Image'
import { PUBLIC_ROUTE } from '@/constants/route/route.constants'
import type { ICategory } from '@/shared/interfaces/api/category/category.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './Category.module.scss'

const Category: FC<ICategory> = ({ category, className }) => {
	return (
		<li className={formatClassName([styles.category, className])}>
			<Link className={styles.link} href={PUBLIC_ROUTE.ITEMS(category.id)}>
				<div className={styles.box}>
					<h3 className={styles.name}>{category.name}</h3>
					<div className={styles.pick}>
						<span>Выбрать</span>
						<MoveRightIcon />
					</div>
				</div>
				<div className={styles.preview}>
					<Image src={category.imagePath} alt={category.name} />
				</div>
			</Link>
		</li>
	)
}

export default Category
