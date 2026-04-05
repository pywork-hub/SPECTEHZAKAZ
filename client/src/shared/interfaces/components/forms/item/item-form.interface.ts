import type {
	CategoryAttribute,
	ItemCategory,
	ItemEdit,
	SelectOption,
} from '@/__generated__/output'
import type { FormEventHandler } from 'react'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IItemForm {
	attributes: CategoryAttribute[]
	categories: ItemCategory[]
	regions: SelectOption[]
	isFormLoading: boolean
	isMutationLoading: boolean
	onSubmit: FormEventHandler<HTMLFormElement>
	isUpdate: boolean
	register: UseFormRegister<ItemEdit>
	control: Control<ItemEdit, any>
	errors: FieldErrors<ItemEdit>
}
