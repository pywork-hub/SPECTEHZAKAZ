import ExitIcon from '@/components/icons/ExitIcon'
import UserIcon from '@/components/icons/UserIcon'
import Logout from '@/components/ui/elements/logout/Logout'
import { SECURE_ROUTE } from '@/constants/route/route.constants'
import type { IHeaderUser } from '@/shared/interfaces/components/header/header.interface'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './HeaderUser.module.scss'

const HeaderUser: FC<IHeaderUser> = ({ user, setUser, onClick }) => {
	return (
		<div className={styles.buttons}>
			<Link className={styles.button} href={SECURE_ROUTE.PROFILE} title={user.name} onClick={onClick}>
				<UserIcon />
				<span>{user.name}</span>
			</Link>
			<Logout className={styles.button} setUser={setUser}>
				<ExitIcon />
				<span>Выйти</span>
			</Logout>
		</div>
	)
}

export default HeaderUser
