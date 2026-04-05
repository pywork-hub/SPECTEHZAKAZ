import Loader from '@/components/ui/common/loader/Loader'
import Field from '@/components/ui/elements/form/field/Field'
import PasswordField from '@/components/ui/elements/form/password-field/PasswordField'
import { useRegister } from '@/hooks/api/auth/useRegister.hook'
import { EMAIL_VALIDATION } from '@/validations/email.validation'
import { LENGTH_VALIDATION } from '@/validations/length.validation'
import { PHONE_VALIDATION } from '@/validations/phone.validation'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from '../Auth.module.scss'
import Checkbox from '@/components/ui/elements/form/checkbox/Checkbox'

const AuthRegister: FC = () => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		errors,
		isLoading,
		isVerification,
	} = useRegister()

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Field
				{...register(
					'name',
					LENGTH_VALIDATION('ФИО или наименование организации', 6, 50)
				)}
				className={styles.field}
				inputClassName={styles.input}
				placeholder="ФИО или наименование организации"
				error={errors.name}
			/>
			<Controller
				name="phone"
				control={control}
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
			<Field
				{...register('email', EMAIL_VALIDATION())}
				className={styles.field}
				inputClassName={styles.input}
				placeholder="E-mail"
				error={errors.email}
			/>
			<PasswordField
				{...register('password', LENGTH_VALIDATION('Пароль', 6, 20))}
				className={styles.field}
				boxClassName={styles.password}
				inputClassName={styles.input}
				placeholder="Пароль"
				error={errors.password}
			/>
			<Checkbox
				{...register('isRemember')}
				className={styles.field}
				inputClassName={styles.input}
				label="Запомнить данные"
			/>
			<div id="widget" style={{ display: 'none' }} />
			{!isVerification &&
				(isLoading ? (
					<div className={styles.submit}>
						<Loader className={styles.loader} />
					</div>
				) : (
					<button className={styles.submit}>Зарегистрироваться</button>
				))}
		</form>
	)
}

export default AuthRegister
