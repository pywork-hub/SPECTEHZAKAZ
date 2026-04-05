import type { ICheckbox } from '@/shared/interfaces/components/checkbox/checkbox.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './Checkbox.module.scss'

const Checkbox: FC<ICheckbox> = ({
	label,
	className,
	inputClassName,
	value,
	onChange,
	...rest
}) => {
	return (
		<label className={formatClassName([styles.field, className])}>
			<input
				className={formatClassName([styles.checkbox, inputClassName])}
				type="checkbox"
				value={value}
				checked={!!value}
				onChange={onChange}
				{...rest}
			/>
			<span className={styles.label}>{label}</span>
		</label>
	)
}

export default Checkbox
