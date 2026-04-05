import Loader from '@/components/ui/common/loader/Loader'
import Field from '@/components/ui/elements/form/field/Field'
import Upload from '@/components/ui/elements/form/upload/Upload'
import type { IProfileForm } from '@/shared/interfaces/components/forms/profile/profile-form.interface'
import { EMAIL_VALIDATION } from '@/validations/email.validation'
import { LENGTH_VALIDATION } from '@/validations/length.validation'
import { PHONE_VALIDATION } from '@/validations/phone.validation'
import { REQUIRED_VALIDATION } from '@/validations/required.validation'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from './ProfileForm.module.scss'

const ProfileForm: FC<IProfileForm> = ({
	isFormLoading,
	isMutationLoading,
	onSubmit,
	control,
	register,
	errors,
}) => {
	return (
		<div className={styles.box}>
			{!isFormLoading && (
				<form className={styles.form} onSubmit={onSubmit}>
					<Controller
						name="avatarPath"
						control={control}
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<Upload
								dragClassName={styles.drag}
								itemsClassName={styles.upload}
								itemClassName={styles.file}
								label="Аватар"
								value={value}
								onChange={onChange}
								error={error}
								placeholder="Загрузите изображение, перетащив его сюда"
								options={{
									maxFiles: 1,
									multiple: false,
								}}
							/>
						)}
						rules={REQUIRED_VALIDATION('Аватар')}
					/>
					<Field
						{...register(
							'name',
							LENGTH_VALIDATION('ФИО или наименование организации', 6, 50)
						)}
						className={styles.field}
						inputClassName={styles.input}
						label="ФИО или наименование организации"
						error={errors.name}
					/>
					<Field
						{...register('email', EMAIL_VALIDATION())}
						className={styles.field}
						inputClassName={styles.input}
						label="E-mail"
						error={errors.email}
					/>
					<Controller
						name="phone"
						control={control}
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<Field
								className={styles.field}
								inputClassName={styles.input}
								mask="+{7} (000) 000-00-00"
								label="Номер телефона"
								error={error}
								onChange={onChange}
								value={value}
							/>
						)}
						rules={PHONE_VALIDATION('Номер телефона')}
					/>
					<Field
						{...register(
							'oldPassword',
							LENGTH_VALIDATION('Старый пароль', 3, 20, true)
						)}
						className={styles.field}
						inputClassName={styles.input}
						label="Старый пароль"
						error={errors.oldPassword}
					/>
					<Field
						{...register(
							'newPassword',
							LENGTH_VALIDATION('Новый пароль', 3, 20, true)
						)}
						className={styles.field}
						inputClassName={styles.input}
						label="Новый пароль"
						error={errors.newPassword}
					/>
					{isMutationLoading ? (
						<div className={styles.submit}>
							<Loader className={styles.loader} />
						</div>
					) : (
						<button className={styles.submit}>Обновить</button>
					)}
				</form>
			)}
		</div>
	)
}

export default ProfileForm
