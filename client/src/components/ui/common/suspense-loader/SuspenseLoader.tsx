'use client'

import { useSuspenseLoader } from '@/hooks/components/suspense-loader/useSuspenseLoader.hook'
import { type FC } from 'react'
import Logo from '../../elements/logo/Logo'
import styles from './SuspenseLoader.module.scss'

const SuspenseLoader: FC = () => {
	const { isLoading } = useSuspenseLoader()

	if (!isLoading) return

	return (
		<div className={styles.loader}>
			<div className={styles.box}>
				<Logo className={styles.logo} />
				<div className={styles.bar}>
					<div className={styles.slider}>
						{Array.from({ length: 7 }).map((_, index) => (
							<span key={index} className={styles.line}></span>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SuspenseLoader
