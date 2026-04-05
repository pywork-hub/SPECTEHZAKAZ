import type { ProfileUpdateInput } from '@/__generated__/output'
import type { FormEventHandler } from 'react'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IProfileForm {
	isFormLoading: boolean
	isMutationLoading: boolean
	onSubmit: FormEventHandler<HTMLFormElement>
	control: Control<ProfileUpdateInput, any>
	register: UseFormRegister<ProfileUpdateInput>
	errors: FieldErrors<ProfileUpdateInput>
}
