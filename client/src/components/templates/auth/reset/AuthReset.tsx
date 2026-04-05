import Loader from '@/components/ui/common/loader/Loader'
import Field from '@/components/ui/elements/form/field/Field'
import PasswordField from '@/components/ui/elements/form/password-field/PasswordField'
import { useReset } from '@/hooks/api/auth/useReset.hook'
import type { IAuthState } from '@/shared/interfaces/components/auth/auth.interface'
import { CONFIRM_VALIDATION } from '@/validations/confirm.validation'
import { LENGTH_VALIDATION } from '@/validations/length.validation'
import { PHONE_VALIDATION } from '@/validations/phone.validation'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../Auth.module.scss'

const AuthReset: FC<IAuthState> = ({ setType }) => {
	const {
		resetForm,
		resetOnSubmit,
		verificationForm,
		verificationOnSubmit,
		isVerified,
		isVerification,
		isLoading,
	} = useReset({ setType })

	return (
		<form
			className={styles.form}
			onSubmit={
				isVerified
					? resetForm.handleSubmit(resetOnSubmit)
					: verificationForm.handleSubmit(verificationOnSubmit)
			}
		>
			{isVerified ? (
				<>
					<PasswordField
						{...resetForm.register(
							'password',
							LENGTH_VALIDATION('Новый пароль', 6, 20)
						)}
						className={styles.field}
						boxClassName={styles.password}
						inputClassName={styles.input}
						placeholder="Новый пароль"
						error={resetForm.formState.errors.password}
					/>
					<PasswordField
						{...resetForm.register('confirmPassword', {
							...LENGTH_VALIDATION('Повторите пароль', 6, 20),
							...CONFIRM_VALIDATION(resetForm, 'password', 'Пароли'),
						})}
						className={styles.field}
						boxClassName={styles.password}
						inputClassName={styles.input}
						placeholder="Повторите пароль"
						error={resetForm.formState.errors.confirmPassword}
					/>
				</>
			) : (
				<>
					<Controller
						name="phone"
						control={verificationForm.control}
						defaultValue=""
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<Field
								className={styles.field}
								inputClassName={styles.input}
								mask="+{7} (000) 000-00-00"
								placeholder="Номер телефона"
								error={error}
								onChange={onChange}
								value={value}
							/>
						)}
						rules={PHONE_VALIDATION('Номер телефона')}
					/>
					<div id="widget" style={{ display: 'none' }} />
				</>
			)}
			{!isVerification && isLoading ? (
				<div className={styles.submit}>
					<Loader className={styles.loader} />
				</div>
			) : (
				<button className={styles.submit}>
					{isVerified ? 'Сбросить пароль' : 'Отправить'}
				</button>
			)}
		</form>
	)
}

export default AuthReset
