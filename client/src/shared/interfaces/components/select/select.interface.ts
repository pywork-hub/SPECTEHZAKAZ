import type { FC, PropsWithChildren } from 'react'
import type { IClassName } from '../../common/class-name/class-name.interface'
import type { ISelectHook } from '../../hooks/select/select.interface'
import type { IField } from '../field/field.interface'

export interface ISelect extends ISelectHook, PropsWithChildren<IClassName> {
	selectedValues?: string | null
	icon: FC
	onSelect: (value: string) => void
	reset: () => void
	hasArrow?: boolean
}

export interface ISearchSelect
	extends Omit<ISelect, 'selectedValues'>,
		PropsWithChildren<IClassName> {
	search: IField
	selectedValues?: string[] | null
}
