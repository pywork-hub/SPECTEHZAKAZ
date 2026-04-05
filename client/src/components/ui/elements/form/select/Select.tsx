import ChevronRightIcon from '@/components/icons/ChevronRightIcon'
import CloseIcon from '@/components/icons/CloseIcon'
import { useOutside } from '@/hooks/helpers/outside/useOutside.hook'
import type { ISelect } from '@/shared/interfaces/components/select/select.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import { createElement, type FC } from 'react'
import Radio from '../../radio/Radio'
import styles from './Select.module.scss'

const Select: FC<ISelect> = ({
	selectedValues,
	options,
	icon,
	onSelect,
	reset,
	children,
	hasArrow,
	className,
}) => {
	const { ref, buttonRef, isShow, setIsShow } = useOutside<HTMLDivElement>()

	return (
		<div
			ref={ref}
			className={formatClassName([
				styles.select,
				isShow && styles.active,
				className,
			])}
		>
			{!selectedValues || selectedValues.length === 0 ? (
				<button
					ref={buttonRef}
					className={styles.toggle}
					onClick={() => setIsShow(!isShow)}
				>
					{hasArrow ? (
						<>
							<div className={styles.box}>
								{createElement(icon)}
								<span>{children}</span>
							</div>
							<ChevronRightIcon />
						</>
					) : (
						<>
							{createElement(icon)}
							<span>{children}</span>
						</>
					)}
				</button>
			) : (
				<div className={styles.pick}>
					<div className={styles.box}>
						{createElement(icon)}
						<div className={styles.value}>
							<span>
								{
									options.find((option) => option.value === selectedValues)
										?.label
								}
							</span>
						</div>
					</div>
					<button className={styles.reset} onClick={reset}>
						<CloseIcon />
					</button>
				</div>
			)}
			{isShow && !selectedValues && (
				<div className={styles.content}>
					<ul className={styles.options}>
						{options.map((option, index) => (
							<li key={index} className={styles.option}>
								<Radio
									className={styles.button}
									isChecked={
										Array.isArray(selectedValues)
											? selectedValues.includes(option.value)
											: selectedValues === option.value
									}
									description={option.label}
									setRadio={() => onSelect(option.value)}
								/>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default Select
