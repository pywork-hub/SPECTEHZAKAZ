import { PAYMENT_METHODS } from '@/base/payment-methods/payment-methods.base'
import CityIcon from '@/components/icons/CityIcon'
import FilterIcon from '@/components/icons/FilterIcon'
import HandCoinsIcon from '@/components/icons/HandCoinsIcon'
import TractorIcon from '@/components/icons/TractorIcon'
import SearchSelect from '@/components/ui/elements/form/search-select/SearchSelect'
import Select from '@/components/ui/elements/form/select/Select'
import type { IRequestsFilters } from '@/shared/interfaces/components/filters/filters.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './RequestsFilters.module.scss'

const RequestsFilters: FC<IRequestsFilters> = ({
	categories,
	regions,
	filters,
	toggleFilter,
	apply,
}) => {
	return (
		<div className={styles.filters}>
			<div className={styles.top}>
				<SearchSelect
					className={formatClassName([
						styles.select,
						!filters?.categories && styles.empty,
					])}
					onSelect={(value) => toggleFilter('categories', value)}
					reset={() => toggleFilter('categories', '', true)}
					selectedValues={filters?.categories}
					options={categories}
					icon={TractorIcon}
					search={{
						placeholder:
							'Выберите из списка или введите наименование техники в поле',
					}}
				>
					Вся спецтехника
				</SearchSelect>
				<SearchSelect
					className={formatClassName([
						styles.select,
						!filters?.regions && styles.empty,
					])}
					onSelect={(value) => toggleFilter('regions', value)}
					reset={() => toggleFilter('regions', '', true)}
					selectedValues={filters?.regions}
					options={regions}
					icon={CityIcon}
					search={{
						placeholder:
							'Выберите из списка или введите название города в поле',
					}}
				>
					По всем регионам
				</SearchSelect>
				<Select
					className={styles.payment}
					hasArrow
					onSelect={(value) => toggleFilter('paymentMethod', value, true)}
					reset={() => toggleFilter('paymentMethod', '', true)}
					selectedValues={filters?.paymentMethod}
					options={PAYMENT_METHODS}
					icon={HandCoinsIcon}
				>
					Способ оплаты
				</Select>
			</div>
			<div className={styles.bottom}>
				<button className={styles.save} onClick={apply}>
					<FilterIcon />
					<span>Применить фильтр</span>
				</button>
			</div>
		</div>
	)
}

export default RequestsFilters
