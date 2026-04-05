import { CREATED_AT_SORT, PRICE_SORT, RATING_SORT } from '@/base/sort/sort.base'
import CalendarIcon from '@/components/icons/CalendarIcon'
import CityIcon from '@/components/icons/CityIcon'
import FilterIcon from '@/components/icons/FilterIcon'
import SortIcon from '@/components/icons/SortIcon'
import StarIcon from '@/components/icons/StarIcon'
import TimeIcon from '@/components/icons/TimeIcon'
import TractorIcon from '@/components/icons/TractorIcon'
import WalletIcon from '@/components/icons/WalletIcon'
import SearchSelect from '@/components/ui/elements/form/search-select/SearchSelect'
import Select from '@/components/ui/elements/form/select/Select'
import Range from '@/components/ui/elements/range/Range'
import type { IItemsFilters } from '@/shared/interfaces/components/filters/filters.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './ItemsFilters.module.scss'

const ItemsFilters: FC<IItemsFilters> = ({
	categories,
	regions,
	filters,
	toggleFilter,
	changeFilter,
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
						placeholder: 'Введите наименование спецтехники',
					}}
				>
					Вид спецтехники
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
						placeholder: 'Введите название города',
					}}
				>
					По всем регионам
				</SearchSelect>
				<div className={styles.sort}>
					<div className={styles.badge}>
						<SortIcon />
						<span>Сортировка:</span>
					</div>
					<Select
						className={formatClassName([
							styles.select,
							!filters?.ratingSort && styles.empty,
						])}
						hasArrow
						onSelect={(value) => toggleFilter('ratingSort', value, true)}
						reset={() => toggleFilter('ratingSort', '', true)}
						selectedValues={filters?.ratingSort}
						options={RATING_SORT}
						icon={StarIcon}
					>
						По рейтингу
					</Select>
					<Select
						className={formatClassName([
							styles.select,
							!filters?.priceSort && styles.empty,
						])}
						hasArrow
						onSelect={(value) => toggleFilter('priceSort', value, true)}
						reset={() => toggleFilter('priceSort', '', true)}
						selectedValues={filters?.priceSort}
						options={PRICE_SORT}
						icon={WalletIcon}
					>
						По цене
					</Select>
					<Select
						className={formatClassName([
							styles.select,
							!filters?.createdAtSort && styles.empty,
						])}
						hasArrow
						onSelect={(value) => toggleFilter('createdAtSort', value, true)}
						reset={() => toggleFilter('createdAtSort', '', true)}
						selectedValues={filters?.createdAtSort}
						options={CREATED_AT_SORT}
						icon={CalendarIcon}
					>
						По актуальности
					</Select>
				</div>
			</div>
			<div className={styles.bottom}>
				<div className={styles.range}>
					<div className={styles.label}>
						<TimeIcon />
						<span>Цена за час</span>
					</div>
					<Range
						className={styles.price}
						hasLabel={false}
						from={filters?.minHourPrice}
						to={filters?.maxHourPrice}
						setFrom={(e) => changeFilter('minHourPrice', e)}
						setTo={(e) => changeFilter('maxHourPrice', e)}
					/>
				</div>
				<button className={styles.save} onClick={apply}>
					<FilterIcon />
					<span>Применить фильтр</span>
				</button>
			</div>
		</div>
	)
}

export default ItemsFilters
