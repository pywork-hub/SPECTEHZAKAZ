'use client'

import tractor from '@/assets/images/tractor.png'
import UserPlusIcon from '@/components/icons/UserPlusIcon'
import Auth from '@/components/templates/auth/Auth'
import Container from '@/components/ui/common/container/Container'
import Image from '@/components/ui/common/image/Image'
import { useAuth } from '@/hooks/components/auth/useAuth.hook'
import type { FC } from 'react'
import styles from './HomeBanner.module.scss'

const HomeBanner: FC = () => {
	const { isLogin, isRegister, type, setType, close } = useAuth()

	return (
		<section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<div className={styles.box}>
						<div className={styles.title}>
							<h1 className={styles.heading}>Биржа услуг спецтехники</h1>
							<p className={styles.description}>
								Удобный поиск заказчиков и исполнителей услуг спецтехники.
							</p>
						</div>
						<button
							className={styles.button}
							onClick={() => setType('register')}
						>
							<UserPlusIcon />
							<span>Быстрая регистрация</span>
						</button>
					</div>
					<div className={styles.preview}>
						<Image src={tractor.src} alt="Трактор" />
					</div>
					{type && (
						<Auth
							isLogin={isLogin}
							isRegister={isRegister}
							setType={setType}
							close={close}
						/>
					)}
				</div>
			</Container>
		</section>
	)
}

export default HomeBanner
