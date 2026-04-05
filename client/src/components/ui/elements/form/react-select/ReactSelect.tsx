import '@/assets/styles/react-select.scss'
import type { IReactSelect } from '@/shared/interfaces/components/react-select/react-select.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import styles from '../Form.module.scss'

const animatedComponents = makeAnimated()

const ReactSelect: FC<IReactSelect> = ({
	label,
	error,
	value,
	options,
	inputClassName,
	className,
	...rest
}) => {
	return (
		<div className={formatClassName([styles.field, className])}>
			{label && <label className={styles.label}>{label}</label>}
			{error && <span className={styles.error}>{error.message}</span>}
			<Select
				className={inputClassName}
				classNamePrefix={`react-select`}
				options={options}
				value={value && options.find((option) => option.value === value.value)}
				components={animatedComponents}
				{...rest}
			/>
		</div>
	)
}

export default ReactSelect
