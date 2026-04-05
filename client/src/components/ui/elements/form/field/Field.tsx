import type { IField } from '@/shared/interfaces/components/field/field.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { ChangeEvent, FC } from 'react'
import { IMaskInput as MaskInput } from 'react-imask'
import styles from '../Form.module.scss'

const Field: FC<IField> = ({
	mask,
	error,
	label,
	className,
	inputClassName,
	placeholder,
	type,
	value,
	onChange,
	children,
	isHidden,
	...rest
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!onChange) return

		const newValue = e.target.value

		if (!/^\d*$/.test(newValue)) {
			return onChange(value)
		}
		if (newValue.startsWith('0') && newValue.length > 1) {
			return onChange(value)
		}

		onChange(newValue)
	}

	return (
		<div className={formatClassName([styles.field, className])}>
			{label && <label className={styles.label}>{label}</label>}
			{children}
			{error && <span className={styles.error}>{error.message}</span>}
			{!isHidden &&
				(mask ? (
					<MaskInput
						className={formatClassName([styles.input, inputClassName])}
						mask={mask}
						placeholder={placeholder}
						value={value as string}
						onAccept={(val) => onChange?.(val)}
					/>
				) : (
					<input
						className={formatClassName([styles.input, inputClassName])}
						type={type}
						placeholder={placeholder}
						value={value !== null ? value : undefined}
						onChange={type === 'number' ? handleChange : onChange}
						{...rest}
					/>
				))}
		</div>
	)
}

export default Field
