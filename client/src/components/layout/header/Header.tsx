'use client'

import Container from '@/components/ui/common/container/Container'
import Loader from '@/components/ui/common/loader/Loader'
import Logo from '@/components/ui/elements/logo/Logo'
import { useUser } from '@/context/user/user.context'
import { FC, useState } from 'react'
import HeaderAuth from './auth/HeaderAuth'
import styles from './Header.module.scss'
import HeaderNavigation from './navigation/HeaderNavigation'
import HeaderUser from './user/HeaderUser'

const Header: FC = () => {
	const { user, setUser, isLoading } = useUser()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev)
	}

	return (
		<>
			<header className={styles.header}>
				<Container>
					<div className={styles.wrapper}>
						<Logo className={styles.logo} />
						<HeaderNavigation />
						{isLoading ? (
							<Loader />
						) : user ? (
							<HeaderUser user={user} setUser={setUser} />
						) : (
							<HeaderAuth />
						)}
						<div className={styles.burger}>
							<button onClick={toggleMenu}>
								<span></span>
								<span></span>
								<span></span>
							</button>
							<span>Меню</span>
						</div>
					</div>
				</Container>
				<div
					className={`${styles.navigation} ${isMenuOpen ? styles.open : ''}`}
				>
					{isLoading ? (
						<Loader />
					) : user ? (
						<HeaderUser user={user} setUser={setUser} onClick={toggleMenu} />
					) : (
						<HeaderAuth />
					)}
					<HeaderNavigation onClick={toggleMenu} />
				</div>
			</header>
		</>
	)
}

export default Header
