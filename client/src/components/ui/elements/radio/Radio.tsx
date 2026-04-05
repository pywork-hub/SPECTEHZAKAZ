import type { IRadio } from '@/shared/interfaces/components/radio/radio.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './Radio.module.scss'

const Radio: FC<IRadio> = ({ isChecked, description, setRadio, className }) => {
	return (
		<button
			className={formatClassName([styles.button, className])}
			onClick={setRadio}
		>
			<div className={styles.radio}>{isChecked && <span />}</div>
			<span className={styles.description}>{description}</span>
		</button>
	)
}

export default Radio
