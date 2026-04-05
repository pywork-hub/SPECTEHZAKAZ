import type { IAdvantage } from '@/shared/interfaces/parts/advantage/advantage.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import { createElement, type FC } from 'react'
import styles from './Advantage.module.scss'

const Advantage: FC<IAdvantage> = ({ advantage, className }) => {
	return (
		<li className={formatClassName([styles.advantage, className])}>
			<div className={styles.icon}>{createElement(advantage.icon)}</div>
			<div className={styles.box}>
				<div className={styles.heading}>{advantage.heading}</div>
				<p className={styles.description}>{advantage.description}</p>
			</div>
		</li>
	)
}

export default Advantage
