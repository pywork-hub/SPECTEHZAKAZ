import type { IClassName } from '@/shared/interfaces/common/class-name/class-name.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC, PropsWithChildren } from 'react'
import styles from './Container.module.scss'

const Container: FC<PropsWithChildren<IClassName>> = ({
	children,
	className,
}) => {
	return (
		<div className={formatClassName([styles.container, className])}>
			{children}
		</div>
	)
}

export default Container
