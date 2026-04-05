import EyeIcon from '@/components/icons/EyeIcon'
import EyeOffIcon from '@/components/icons/EyeOffIcon'
import type { IPasswordField } from '@/shared/interfaces/components/password-field/password-field.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import { useState, type FC } from 'react'
import globalStyles from './../Form.module.scss'
import styles from './PasswordField.module.scss'

const PasswordField: FC<IPasswordField> = ({
	label,
	error,
	className,
	boxClassName,
	inputClassName,
	value,
	type,
	...rest
}) => {
	const [isShow, setIsShow] = useState(false)

	return (
		<div className={formatClassName([globalStyles.field, className])}>
			{label && <label className={globalStyles.label}>{label}</label>}
			{error && <span className={globalStyles.error}>{error.message}</span>}
			<div className={formatClassName([styles.box, boxClassName])}>
				<input
					className={formatClassName([globalStyles.input, inputClassName])}
					type={isShow ? 'text' : 'password'}
					{...rest}
				/>
				<button
					type="button"
					className={styles.switch}
					onClick={() => setIsShow(!isShow)}
				>
					{isShow ? <EyeOffIcon /> : <EyeIcon />}
				</button>
			</div>
		</div>
	)
}

export default PasswordField
