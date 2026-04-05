import { HEADER_PAGES } from '@/base/pages/pages.base'
import type { IHeaderNavigation } from '@/shared/interfaces/components/header/header.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'
import styles from './HeaderNavigation.module.scss'

const HeaderNavigation: FC<IHeaderNavigation> = ({ onClick }) => {
	const pathname = usePathname()

	return (
		<nav className={styles.navigation}>
			<ul className={styles.list}>
				{HEADER_PAGES.map((page, index) => (
					<li key={index} className={styles.item}>
						<Link
							className={formatClassName([
								styles.link,
								pathname === page.href && styles.active,
							])}
							href={page.href}
							onClick={onClick}
						>
							{page.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default HeaderNavigation
