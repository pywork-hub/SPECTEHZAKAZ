'use client'

import '@/assets/styles/custom-react-select.scss'
import CityIcon from '@/components/icons/CityIcon'
import TractorIcon from '@/components/icons/TractorIcon'
import ReactSelect from '@/components/ui/elements/form/react-select/ReactSelect'
import { useSidebarFilters } from '@/hooks/components/sidebar-filters/useSidebarFilters.hook'
import type { IHomeCatalog } from '@/shared/interfaces/components/home/home.interface'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import styles from './SidebarFilters.module.scss'

const SidebarFilters: FC<IHomeCatalog> = ({
	categories,
	itemRegions,
	requestRegions,
}) => {
	const { itemForm, requestForm, itemFormOnSubmit, requestFormOnSubmit } =
		useSidebarFilters()

	return (
		<div className={styles.sidebar}>
			<div className={styles.filters}>
				<div className={styles.heading}>Поиск исполнителей</div>
				<form
					className={styles.form}
					onSubmit={itemForm.handleSubmit(itemFormOnSubmit)}
				>
					<Controller
						name="category"
						control={itemForm.control}
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<ReactSelect
								className={styles.select}
								onChange={onChange}
								value={value}
								options={categories.map((category) => ({
									label: category.name,
									value: `${category.id}`,
								}))}
								placeholder={
									<>
										<TractorIcon width={28} height={28} />
										<span>Вид техники</span>
									</>
								}
								error={error}
								isSearchable={false}
							/>
						)}
					/>
					<Controller
						name="region"
						control={itemForm.control}
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<ReactSelect
								className={styles.select}
								onChange={onChange}
								value={value}
								options={itemRegions}
								placeholder={
									<>
										<CityIcon width={28} height={28} />
										<span>Регион</span>
									</>
								}
								error={error}
								isSearchable={false}
							/>
						)}
					/>
					<button className={styles.button}>Показать объявления</button>
				</form>
			</div>
			<div className={styles.filters}>
				<div className={styles.heading}>Поиск заказов</div>
				<form
					className={styles.form}
					onSubmit={requestForm.handleSubmit(requestFormOnSubmit)}
				>
					<Controller
						name="category"
						control={requestForm.control}
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<ReactSelect
								className={styles.select}
								onChange={onChange}
								value={value}
								options={categories.map((category) => ({
									label: category.name,
									value: `${category.id}`,
								}))}
								placeholder={
									<>
										<TractorIcon width={28} height={28} />
										<span>Вид техники</span>
									</>
								}
								error={error}
								isSearchable={false}
							/>
						)}
					/>
					<Controller
						name="region"
						control={requestForm.control}
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<ReactSelect
								className={styles.select}
								onChange={onChange}
								value={value}
								options={requestRegions}
								placeholder={
									<>
										<CityIcon width={28} height={28} />
										<span>Регион</span>
									</>
								}
								error={error}
								isSearchable={false}
							/>
						)}
					/>
					<button className={styles.button}>Показать заказы</button>
				</form>
			</div>
		</div>
	)
}

export default SidebarFilters
