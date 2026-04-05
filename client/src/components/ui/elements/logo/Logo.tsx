import { PUBLIC_ROUTE } from '@/constants/route/route.constants'
import type { IClassName } from '@/shared/interfaces/common/class-name/class-name.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './Logo.module.scss'

const Logo: FC<IClassName> = ({ className }) => {
	return (
		<Link
			className={formatClassName([styles.logo, className])}
			href={PUBLIC_ROUTE.HOME}
		>
			<span>Спецтех</span>
			<span>заказ</span>
		</Link>
	)
}

export default Logo
