import EmailIcon from '@/components/icons/EmailIcon'
import PhoneIcon from '@/components/icons/PhoneIcon'
import Loader from '@/components/ui/common/loader/Loader'
import Checkbox from '@/components/ui/elements/form/checkbox/Checkbox'
import Field from '@/components/ui/elements/form/field/Field'
import PasswordField from '@/components/ui/elements/form/password-field/PasswordField'
import { useLogin } from '@/hooks/api/auth/useLogin.hook'
import { EMAIL_VALIDATION } from '@/validations/email.validation'
import { LENGTH_VALIDATION } from '@/validations/length.validation'
import { PHONE_VALIDATION } from '@/validations/phone.validation'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../Auth.module.scss'

const AuthLogin: FC = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		errors,
		isLoading,
		isPhone,
		setIsPhone,
	} = useLogin()

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.switcher}>
				{isPhone ? (
					<Controller
						name="phone"
						control={control}
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
				) : (
					<Field
						{...register('email', EMAIL_VALIDATION())}
						className={styles.field}
						inputClassName={styles.input}
						placeholder="E-mail"
						error={errors.email}
					/>
				)}
				<button
					type="button"
					className={styles.switch}
					onClick={() => setIsPhone(!isPhone)}
				>
					{isPhone ? <EmailIcon /> : <PhoneIcon />}
				</button>
			</div>
			<PasswordField
				{...register('password', LENGTH_VALIDATION('Пароль', 6, 20))}
				className={styles.field}
				boxClassName={styles.password}
				inputClassName={styles.input}
				type="password"
				placeholder="Пароль"
				error={errors.password}
			/>
			<Checkbox
				{...register('isRemember')}
				className={styles.field}
				inputClassName={styles.input}
				label='Запомнить данные'
			/>
			{isLoading ? (
				<div className={styles.submit}>
					<Loader className={styles.loader} />
				</div>
			) : (
				<button className={styles.submit}>Войти</button>
			)}
		</form>
	)
}

export default AuthLogin
