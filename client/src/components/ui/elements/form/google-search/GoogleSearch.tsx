import { useGoogleSearch } from '@/hooks/components/google-search/useGoogleSearch.hook'
import type { IGoogleSearch } from '@/shared/interfaces/components/google-search/google-search.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import globalStyles from '../Form.module.scss'
import styles from './GoogleSearch.module.scss'

const GoogleSearch: FC<IGoogleSearch> = ({
	allowedRegions,
	label,
	error,
	value,
	onChange,
	inputClassName,
	className,
}) => {
	const { input, suggestions, handleChange, onSelect } = useGoogleSearch({
		allowedRegions,
		value,
		onChange,
	})

	return (
		<div className={formatClassName([globalStyles.field, className])}>
			{label && <label className={globalStyles.label}>{label}</label>}
			{error && <span className={globalStyles.error}>{error.message}</span>}
			<div className={styles.box}>
				<input
					className={formatClassName([styles.input, inputClassName])}
					value={input}
					onChange={handleChange}
				/>
				{suggestions.length > 0 && (
					<ul className={styles.addresses}>
						{suggestions.map((address, idx) => (
							<li
								key={idx}
								className={styles.address}
								onClick={() => onSelect(address)}
							>
								{address}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default GoogleSearch
