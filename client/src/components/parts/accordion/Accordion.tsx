'use client'

import PlusIcon from '@/components/icons/PlusIcon'
import type { IFaq } from '@/shared/interfaces/api/faq/faq.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import { useState, type FC } from 'react'
import styles from './Accordion.module.scss'

const Accordion: FC<IFaq> = ({ faq, className }) => {
	const [isShow, setIsShow] = useState(false)

	return (
		<li
			className={formatClassName([
				styles.accordion,
				isShow && styles.opened,
				className,
			])}
		>
			<div className={styles.question} onClick={() => setIsShow(!isShow)}>
				<p>{faq.question}</p>
				<div className={styles.icon}>
					<PlusIcon />
				</div>
			</div>
			{isShow && (
				<div
					className={styles.answer}
					dangerouslySetInnerHTML={{ __html: faq.answer }}
				/>
			)}
		</li>
	)
}

export default Accordion
