import Loader from '@/components/ui/common/loader/Loader'
import Field from '@/components/ui/elements/form/field/Field'
import GoogleSearch from '@/components/ui/elements/form/google-search/GoogleSearch'
import ReactSelect from '@/components/ui/elements/form/react-select/ReactSelect'
import Textarea from '@/components/ui/elements/form/textarea/Textarea'
import Upload from '@/components/ui/elements/form/upload/Upload'
import type { IItemForm } from '@/shared/interfaces/components/forms/item/item-form.interface'
import { GOOGLE_VALIDATION } from '@/validations/google.validation'
import { LENGTH_VALIDATION } from '@/validations/length.validation'
import { PRICE_VALIDATION } from '@/validations/price.validation'
import { REQUIRED_VALIDATION } from '@/validations/required.validation'
import { type FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from './ItemForm.module.scss'

const ItemForm: FC<IItemForm> = ({
	attributes,
	categories,
	regions,
	register,
	control,
	errors,
	onSubmit,
	isFormLoading,
	isMutationLoading,
	isUpdate,
}) => {
	return (
		<div className={styles.box}>
			{!isFormLoading && (
				<form className={styles.form} onSubmit={onSubmit}>
					<div className={styles.row}>
						<Field
							{...register(
								'name',
								LENGTH_VALIDATION('Название объявления', 10, 50)
							)}
							className={styles.field}
							inputClassName={styles.input}
							label="Название объявления"
							error={errors.name}
						/>
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
									options={categories.map(({ attributes, ...category }) => ({
										label: category.label,
										value: category.value,
									}))}
									label="Вид спецтехники"
									placeholder="Выберите"
									error={error}
								/>
							)}
							rules={REQUIRED_VALIDATION('Вид спецтехники')}
						/>
					</div>
					<div className={styles.row}>
						<Controller
							name="address"
							control={control}
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<GoogleSearch
									inputClassName={styles.google}
									allowedRegions={regions}
									value={value}
									onChange={onChange}
									label="Место оказания услуг"
									error={error}
								/>
							)}
							rules={GOOGLE_VALIDATION('Место оказания услуг')}
						/>
					</div>
					<div className={styles.row}>
						<Controller
							defaultValue="500"
							name="hourPrice"
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
									label="Цена за час"
									error={error}
								/>
							)}
							rules={PRICE_VALIDATION('Цена за час', 500, 100000)}
						/>
						<Controller
							defaultValue="5000"
							name="shiftPrice"
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
									label="Цена за смену (8 часов)"
									error={error}
								/>
							)}
							rules={PRICE_VALIDATION('Цена за смену', 500, 5000000)}
						/>
						<Controller
							defaultValue="8"
							name="minHours"
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
									label="Минимальный объем работы (часов)"
									error={error}
								/>
							)}
							rules={PRICE_VALIDATION('Минимальный объем работы', 1, 24)}
						/>
					</div>
					{Array.from(
						{ length: Math.ceil(attributes.length / 4) },
						(_, rowIndex) => (
							<div key={rowIndex} className={styles.row}>
								{attributes
									.slice(rowIndex * 4, rowIndex * 4 + 4)
									.map((attribute, indexInRow) => {
										const index = rowIndex * 4 + indexInRow

										return (
											<Controller
												key={index}
												defaultValue={undefined}
												name={`properties.${index}`}
												control={control}
												render={({
													field: { value, onChange },
													fieldState: { error },
												}) => (
													<ReactSelect
														inputClassName={styles.input}
														onChange={onChange}
														value={value}
														options={attribute.properties || []}
														label={attribute.name}
														placeholder="Выберите"
														error={error}
													/>
												)}
												rules={REQUIRED_VALIDATION('Свойство')}
											/>
										)
									})}
							</div>
						)
					)}
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
					<Controller
						name="imagePaths"
						control={control}
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<Upload
								dragClassName={styles.drag}
								itemsClassName={styles.files}
								itemClassName={styles.file}
								label="Картинки"
								placeholder="Загрузите до 6 изображений, перетащив их сюда"
								value={value || []}
								onChange={onChange}
								error={error}
								options={{
									maxFiles: 6,
									multiple: true,
								}}
							/>
						)}
						rules={REQUIRED_VALIDATION('Картинка')}
					/>
					{isMutationLoading ? (
						<div className={styles.submit}>
							<Loader className={styles.loader} />
						</div>
					) : (
						<button className={styles.submit}>
							{isUpdate ? 'Обновить объявление' : 'Создать объявление'}
						</button>
					)}
				</form>
			)}
		</div>
	)
}

export default ItemForm
