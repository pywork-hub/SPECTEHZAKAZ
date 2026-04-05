import type { IClassName } from '@/shared/interfaces/common/class-name/class-name.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './Loader.module.scss'

const Loader: FC<IClassName> = ({ className }) => {
	return <span className={formatClassName([styles.loader, className])} />
}

export default Loader
