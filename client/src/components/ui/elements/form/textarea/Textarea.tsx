import type { ITextarea } from '@/shared/interfaces/components/textarea/textarea.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from '../Form.module.scss'

const Textarea: FC<ITextarea> = ({
	error,
	label,
	className,
	textareaClassName,
	onChange,
	...rest
}) => {
	return (
		<div className={formatClassName([styles.field, className])}>
			{label && <label className={styles.label}>{label}</label>}
			{error && <span className={styles.error}>{error.message}</span>}
			<textarea
				className={formatClassName([styles.input, textareaClassName])}
				onChange={onChange}
				{...rest}
			/>
		</div>
	)
}

export default Textarea
