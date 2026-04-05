import { type SelectOption, Sort } from '@/__generated__/output'

export const RATING_SORT: SelectOption[] = [
	{
		label: 'По возрастанию',
		value: Sort.Asc,
	},
	{
		label: 'По убыванию',
		value: Sort.Desc,
	},
]

export const PRICE_SORT: SelectOption[] = [
	{
		label: 'По возрастанию',
		value: Sort.Asc,
	},
	{
		label: 'По убыванию',
		value: Sort.Desc,
	},
]

export const CREATED_AT_SORT: SelectOption[] = [
	{
		label: 'Сначала новые',
		value: Sort.Desc,
	},
	{
		label: 'Сначала старые',
		value: Sort.Asc,
	},
]
