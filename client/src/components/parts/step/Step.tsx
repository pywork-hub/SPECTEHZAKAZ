import type { IStep } from '@/shared/interfaces/parts/step/step.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import { createElement, type FC } from 'react'
import styles from './Step.module.scss'

const Step: FC<IStep> = ({ step, className }) => {
	return (
		<li className={formatClassName([styles.step, className])}>
			<div className={styles.icon}>{createElement(step.icon)}</div>
			<div className={styles.heading}>{step.heading}</div>
			<p className={styles.description}>{step.description}</p>
		</li>
	)
}

export default Step
