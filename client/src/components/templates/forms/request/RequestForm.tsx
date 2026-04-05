import { PAYMENT_METHODS } from '@/base/payment-methods/payment-methods.base'
import { PRICING_TYPES } from '@/base/pricing-types/pricing-types.base'
import Loader from '@/components/ui/common/loader/Loader'
import Checkbox from '@/components/ui/elements/form/checkbox/Checkbox'
import Field from '@/components/ui/elements/form/field/Field'
import ReactSelect from '@/components/ui/elements/form/react-select/ReactSelect'
import Textarea from '@/components/ui/elements/form/textarea/Textarea'
import type { IRequestForm } from '@/shared/interfaces/components/forms/request/request-form.interface'
import { DATE_VALIDATION } from '@/validations/date.validation'
import { LENGTH_VALIDATION } from '@/validations/length.validation'
import { NUMBER_VALIDATION } from '@/validations/number.validation'
import { PHONE_VALIDATION } from '@/validations/phone.validation'
import { PRICE_VALIDATION } from '@/validations/price.validation'
import { REQUIRED_VALIDATION } from '@/validations/required.validation'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from './RequestForm.module.scss'

const RequestForm: FC<IRequestForm> = ({
	categories,
	regions,
	register,
	control,
	errors,
	onSubmit,
	isFormLoading,
	isMutationLoading,
	isUpdate,
	isQuote,
	handleQuote,
}) => {
	return (
		<div className={styles.box}>
			{isFormLoading ? (
				<Loader />
			) : (
				<form className={styles.form} onSubmit={onSubmit}>
					<div className={styles.row}>
						<Controller
							name="category"
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<ReactSelect
									inputClassName={styles.input}
									onChange={onChange}
									value={value}
									options={categories}
									label="Вид спецтехники"
									placeholder="Выберите"
									error={error}
								/>
							)}
							rules={REQUIRED_VALIDATION('Вид спецтехники')}
						/>
						<Controller
							name="region"
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<ReactSelect
									inputClassName={styles.input}
									onChange={onChange}
									value={value}
									options={regions}
									label="Место проведения работ"
									placeholder="Выберите"
									error={error}
								/>
							)}
							rules={REQUIRED_VALIDATION('Место проведения работ')}
						/>
					</div>
					<div className={styles.row}>
						<Controller
							name="paymentMethod"
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<ReactSelect
									inputClassName={styles.input}
									onChange={onChange}
									value={value}
									options={PAYMENT_METHODS}
									label="Способ оплаты"
									placeholder="Выберите"
									error={error}
								/>
							)}
							rules={REQUIRED_VALIDATION('Способ оплаты')}
						/>
						<Controller
							name="pricingType"
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<ReactSelect
									inputClassName={styles.input}
									onChange={onChange}
									value={value}
									options={PRICING_TYPES}
									label="Тип оплаты"
									placeholder="Выберите"
									error={error}
								/>
							)}
							rules={REQUIRED_VALIDATION('Тип оплаты')}
						/>
						<Controller
							name="phone"
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<Field
									className={styles.field}
									inputClassName={styles.input}
									mask="+{7} (000) 000-00-00"
									placeholder="+7 (999) 999-99-99"
									label="Номер телефона"
									error={error}
									onChange={onChange}
									value={value}
								/>
							)}
							rules={PHONE_VALIDATION('Номер телефона')}
						/>
					</div>
					<div className={styles.row}>
						<Controller
							name="quantity"
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<Field
									type="number"
									className={styles.field}
									inputClassName={styles.input}
									value={value}
									onChange={onChange}
									label="Единиц спецтехники"
									error={error}
								/>
							)}
							rules={NUMBER_VALIDATION('Единиц спецтехники', 1, 10000)}
						/>
						<Controller
							name="startAt"
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<Field
									mask="00.00.0000"
									className={styles.field}
									inputClassName={styles.input}
									value={value}
									onChange={onChange}
									label="Дата начала работ (ДД/ММ/ГГГГ)"
									error={error}
								/>
							)}
							rules={DATE_VALIDATION('Дата начала работ')}
						/>
					</div>
					<div className={styles.row}>
						<Controller
							name="price"
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<Field
									type="number"
									className={styles.field}
									inputClassName={styles.input}
									value={value}
									isHidden={isQuote}
									onChange={onChange}
									label="Расценка (рублей)"
									error={error}
									children={
										<Checkbox
											className={styles.quote}
											label="Запрос расценки"
											value={isQuote}
											onChange={handleQuote}
										/>
									}
								/>
							)}
							rules={isQuote ? {} : PRICE_VALIDATION('Расценка', 1, 10000000)}
						/>
					</div>
					<Textarea
						{...register(
							'description',
							LENGTH_VALIDATION('Описание', 30, 1200)
						)}
						className={styles.field}
						textareaClassName={styles.textarea}
						label="Описание"
						error={errors.description}
					/>
					{isMutationLoading ? (
						<div className={styles.submit}>
							<Loader className={styles.loader} />
						</div>
					) : (
						<button className={styles.submit}>
							{isUpdate ? 'Обновить заказ' : 'Создать заказ'}
						</button>
					)}
				</form>
			)}
		</div>
	)
}

export default RequestForm
