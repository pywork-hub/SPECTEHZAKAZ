import type { RequestEdit, SelectOption } from '@/__generated__/output'
import type { ChangeEvent, FormEventHandler } from 'react'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IRequestForm {
	categories: SelectOption[]
	regions: SelectOption[]
	isQuote: boolean
	isFormLoading: boolean
	isMutationLoading: boolean
	onSubmit: FormEventHandler<HTMLFormElement>
	isUpdate: boolean
	register: UseFormRegister<RequestEdit>
	control: Control<RequestEdit, any>
	errors: FieldErrors<RequestEdit>
	handleQuote: (e: ChangeEvent<HTMLInputElement>) => void
}
