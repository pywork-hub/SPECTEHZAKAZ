'use client'

import CookieIcon from '@/components/icons/CookieIcon'
import { useCookiesStore } from '@/store/cookies/cookies.store'
import type { FC } from 'react'
import styles from './Cookies.module.scss'

const Cookies: FC = () => {
	const { isSubmitted, isHydrated, accept, decline } = useCookiesStore()

	return (
		isHydrated &&
		!isSubmitted && (
			<div className={styles.overlay}>
				<div className={styles.cookies}>
					<div className={styles.box}>
						<div className={styles.icon}>
							<CookieIcon />
						</div>
						<div className={styles.description}>
							Этот сайт использует файлы cookie, чтобы предоставить вам
							наилучший опыт использования.
						</div>
						<div className={styles.buttons}>
							<button type="button" className={styles.button} onClick={accept}>
								Принять
							</button>
							<button type="button" className={styles.button} onClick={decline}>
								Отклонить
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default Cookies
