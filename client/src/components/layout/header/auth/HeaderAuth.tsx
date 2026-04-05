import KeyRoundIcon from '@/components/icons/KeyRoundIcon'
import UserPlusIcon from '@/components/icons/UserPlusIcon'
import Auth from '@/components/templates/auth/Auth'
import { useAuth } from '@/hooks/components/auth/useAuth.hook'
import type { FC } from 'react'
import styles from './HeaderAuth.module.scss'

const HeaderAuth: FC = () => {
	const { isLogin, isRegister, type, setType, close } = useAuth()

	return (
		<>
			<div className={styles.buttons}>
				<button
					className={styles.button}
					onClick={() => setType('login')}
					title={'Вход'}
				>
					<KeyRoundIcon />
					<span>Вход</span>
				</button>
				<button
					className={styles.button}
					onClick={() => setType('register')}
					title={'Регистрация'}
				>
					<UserPlusIcon />
					<span>Регистрация</span>
				</button>
			</div>
			{type && (
				<Auth
					isLogin={isLogin}
					isRegister={isRegister}
					setType={setType}
					close={close}
				/>
			)}
		</>
	)
}

export default HeaderAuth
