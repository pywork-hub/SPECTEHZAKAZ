import KeyRoundIcon from '@/components/icons/KeyRoundIcon'
import UserPlusIcon from '@/components/icons/UserPlusIcon'
import Logo from '@/components/ui/elements/logo/Logo'
import { PUBLIC_ROUTE } from '@/constants/route/route.constants'
import type { IAuth } from '@/shared/interfaces/components/auth/auth.interface'
import type { FC } from 'react'
import Modal from '../modal/Modal'
import styles from './Auth.module.scss'
import AuthLogin from './login/AuthLogin'
import AuthRegister from './register/AuthRegister'
import AuthReset from './reset/AuthReset'

const Auth: FC<IAuth> = ({ isLogin, isRegister, setType, close }) => {
	return (
		<Modal className={styles.auth} close={close}>
			<div className={styles.head}>
				<Logo className={styles.logo} />
			</div>
			<div className={styles.box}>
				<h4 className={styles.heading}>
					{isLogin ? 'Вход' : isRegister ? 'Регистрация' : 'Сбросить пароль'}
				</h4>
				{isLogin ? (
					<>
						<AuthLogin />
						<button className={styles.forget} onClick={() => setType('reset')}>
							Забыли пароль?
						</button>
					</>
				) : isRegister ? (
					<AuthRegister />
				) : (
					<AuthReset setType={setType} />
				)}
			</div>
			<div className={styles.line}>
				<span>
					{isLogin
						? 'Нет аккаунта?'
						: isRegister
						? 'Уже есть аккаунт?'
						: 'Вспомнили пароль?'}
				</span>
			</div>
			<button
				className={styles.change}
				onClick={() => setType(isLogin ? 'register' : 'login')}
			>
				{isLogin ? (
					<>
						<UserPlusIcon />
						<span>Зарегистрироваться</span>
					</>
				) : (
					<>
						<KeyRoundIcon />
						<span>Войти</span>
					</>
				)}
			</button>
			<div className={styles.foot}>
				{isLogin
					? 'Войдя в систему'
					: isRegister
					? 'Регистрируясь'
					: 'Продолжая'}
				, вы соглашаетесь с{' '}
				<button
					className={styles.link}
					onClick={() => {
						close()
						window.location.replace(PUBLIC_ROUTE.POLICIES.TERMS)
					}}
				>
					Условиями использования
				</button>{' '}
				и
				<button
					className={styles.link}
					onClick={() => {
						close()
						window.location.replace(PUBLIC_ROUTE.POLICIES.PRIVACY)
					}}
				>
					Политикой конфиденциальности
				</button>
			</div>
		</Modal>
	)
}

export default Auth
