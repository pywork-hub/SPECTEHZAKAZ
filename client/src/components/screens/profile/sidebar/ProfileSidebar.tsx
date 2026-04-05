import ExitIcon from '@/components/icons/ExitIcon'
import ProfileForm from '@/components/templates/forms/profile/ProfileForm'
import Modal from '@/components/templates/modal/Modal'
import Image from '@/components/ui/common/image/Image'
import Logout from '@/components/ui/elements/logout/Logout'
import { useUser } from '@/context/user/user.context'
import { useManageProfile } from '@/hooks/api/user/useManageProfile.hook'
import type { IProfile } from '@/shared/interfaces/api/user/user.interface'
import type { FC } from 'react'
import styles from './ProfileSidebar.module.scss'

const ProfileSidebar: FC<IProfile> = ({ profile }) => {
	const { setUser } = useUser()

	const {
		updateProfile,
		register,
		control,
		handleSubmit,
		onSubmit,
		errors,
		isFormLoading,
		closeForm,
		isShow,
		isMutationLoading,
	} = useManageProfile()

	return (
		<>
			<div className={styles.sidebar}>
				<div className={styles.avatar}>
					<Image src={profile.avatarPath} alt={profile.name} />
				</div>
				<div className={styles.info}>
					<div className={styles.name}>{profile.name}</div>
					<ul className={styles.options}>
						<li className={styles.option}>
							Номер профиля: <strong>{profile.id}</strong>
						</li>
						<li className={styles.option}>
							На сайте с <strong>{profile.createdAt}</strong>
						</li>
						<li className={styles.option}>
							Размещено объявлений: <span>{profile.itemsCount}</span>
						</li>
						<li className={styles.option}>
							Размещено заказов: <span>{profile.requestsCount}</span>
						</li>
						<li className={styles.option}>E-mail: {profile.email}</li>
						<li className={styles.option}>Номер телефона: {profile.phone}</li>
					</ul>
					<button className={styles.edit} onClick={updateProfile}>
						Редактировать данные
					</button>
					<Logout className={styles.logout} setUser={setUser}>
						<ExitIcon />
						<span>Выйти из профиля</span>
					</Logout>
				</div>
			</div>
			{isShow && (
				<Modal
					className={styles.form}
					heading="Редактирование данных профиля"
					close={closeForm}
				>
					<ProfileForm
						isFormLoading={isFormLoading}
						register={register}
						control={control}
						errors={errors}
						onSubmit={handleSubmit(onSubmit)}
						isMutationLoading={isMutationLoading}
					/>
				</Modal>
			)}
		</>
	)
}

export default ProfileSidebar
