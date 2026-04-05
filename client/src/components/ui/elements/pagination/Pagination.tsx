import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon'
import type { IPagination } from '@/shared/interfaces/components/pagination/pagination.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './Pagination.module.scss'

const Pagination: FC<IPagination> = ({
	pages,
	page,
	prev,
	next,
	goTo,
	className,
}) => {
	return (
		<ul className={formatClassName([styles.list, className])}>
			{page > 1 && (
				<li className={styles.prev}>
					<button className={styles.button} onClick={prev}>
						<ChevronLeftIcon />
					</button>
				</li>
			)}
			{Array.from({ length: pages }).map((_, index) => {
				const currentPage = index + 1

				return (
					<li key={index}>
						<button
							className={formatClassName([
								styles.button,
								page === currentPage ? styles.picked : undefined,
							])}
							onClick={() => goTo(currentPage)}
						>
							{currentPage}
						</button>
					</li>
				)
			})}
			{page < pages && (
				<li className={styles.next}>
					<button className={styles.button} onClick={next}>
						<ChevronRightIcon />
					</button>
				</li>
			)}
		</ul>
	)
}

export default Pagination
