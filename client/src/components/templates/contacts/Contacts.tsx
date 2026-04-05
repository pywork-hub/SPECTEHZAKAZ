import PhoneIcon from '@/components/icons/PhoneIcon'
import UserPlusIcon from '@/components/icons/UserPlusIcon'
import { EXTERNAL_ROUTE } from '@/constants/route/route.constants'
import { useAuth } from '@/hooks/components/auth/useAuth.hook'
import type { IContacts } from '@/shared/interfaces/components/contacts/contacts.interface'
import Link from 'next/link'
import type { FC } from 'react'
import Auth from '../auth/Auth'
import Modal from '../modal/Modal'
import styles from './Contacts.module.scss'

const Contacts: FC<IContacts> = ({
	isNotOpen,
	heading,
	contacts,
	setContacts,
}) => {
	const { isLogin, isRegister, type, setType, close } = useAuth()

	return (
		<>
			<Modal
				className={styles.modal}
				heading={heading}
				close={() => setContacts(null)}
			>
				<div className={styles.buttons}>
					{isNotOpen ? (
						<div className={styles.auth}>
							<button
								className={styles.register}
								onClick={() => setType('register')}
							>
								<UserPlusIcon />
								<span>Быстрая регистрация</span>
							</button>
							<p className={styles.description}>
								Чтобы посмотреть контакты заказчика, пожалуйста, войдите в
								аккаунт или зарегистрируйтесь.
							</p>
						</div>
					) : (
						<Link
							className={styles.phone}
							href={EXTERNAL_ROUTE.PHONE(contacts.phone)}
						>
							<PhoneIcon />
							<span>{contacts.phone}</span>
						</Link>
					)}
				</div>
			</Modal>
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

export default Contacts
