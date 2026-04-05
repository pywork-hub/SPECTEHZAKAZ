import type { IRange } from '@/shared/interfaces/components/range/range.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import Field from '../form/field/Field'
import styles from './Range.module.scss'

const Range: FC<IRange> = ({
	hasLabel = true,
	from,
	to,
	setFrom,
	setTo,
	className,
}) => {
	return (
		<div className={styles.boxes}>
			<div className={styles.box}>
				{hasLabel && <span className={styles.label}>От:</span>}
				<Field
					className={formatClassName([styles.field, className])}
					inputClassName={styles.input}
					value={from || ''}
					onChange={setFrom}
					placeholder={!hasLabel ? 'От' : undefined}
				/>
			</div>
			<div className={styles.box}>
				{hasLabel && <span className={styles.label}>До:</span>}
				<Field
					className={formatClassName([styles.field, className])}
					inputClassName={styles.input}
					value={to || ''}
					onChange={setTo}
					placeholder={!hasLabel ? 'До' : undefined}
				/>
			</div>
		</div>
	)
}

export default Range
