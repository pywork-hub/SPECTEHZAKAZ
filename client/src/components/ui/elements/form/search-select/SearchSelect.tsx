import ChevronRightIcon from '@/components/icons/ChevronRightIcon'
import CloseIcon from '@/components/icons/CloseIcon'
import { useSearchSelect } from '@/hooks/components/select/useSearchSelect.hook'
import type { ISearchSelect } from '@/shared/interfaces/components/select/select.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import { createElement, type FC } from 'react'
import Field from '../field/Field'
import styles from './SearchSelect.module.scss'

const SearchSelect: FC<ISearchSelect> = ({
	selectedValues,
	options,
	icon,
	search,
	onSelect,
	reset,
	children,
	className,
}) => {
	const {
		ref,
		buttonRef,
		isShow,
		setIsShow,
		searchTerm,
		setSearchTerm,
		availableOptions,
	} = useSearchSelect({ options })

	return (
		<div ref={ref} className={formatClassName([styles.select, className])}>
			<div className={styles.bar}>
				{!selectedValues || selectedValues.length === 0 ? (
					<>
						<button
							ref={buttonRef}
							className={formatClassName([
								styles.toggle,
								isShow && styles.active,
							])}
							onClick={() => setIsShow(!isShow)}
						>
							<div className={styles.box}>
								{createElement(icon)}
								<span>{children}</span>
							</div>
							<ChevronRightIcon />
						</button>
						<Field
							inputClassName={styles.field}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onClick={() => setIsShow(true)}
							{...search}
						/>
					</>
				) : (
					<div className={styles.pick}>
						<div className={styles.value}>
							<span>
								{
									availableOptions.find(
										(option) => option.value === selectedValues[0]
									)?.label
								}
							</span>
						</div>
						<button className={styles.reset} onClick={reset}>
							<CloseIcon />
						</button>
					</div>
				)}
			</div>
			{isShow && !selectedValues && (
				<div className={styles.content}>
					{availableOptions.length > 0 ? (
						<ul className={styles.options}>
							{availableOptions.map((option, index) => (
								<li key={index} className={styles.option}>
									<button
										className={formatClassName([styles.button])}
										onClick={() => onSelect(option.value)}
									>
										{option.label}
									</button>
								</li>
							))}
						</ul>
					) : (
						<p className={styles.empty}>Ничего не найдено</p>
					)}
				</div>
			)}
		</div>
	)
}

export default SearchSelect
