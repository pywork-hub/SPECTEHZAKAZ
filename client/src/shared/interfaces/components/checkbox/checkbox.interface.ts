import type { AllHTMLAttributes } from 'react'

export interface ICheckbox
	extends Omit<AllHTMLAttributes<HTMLInputElement>, 'value'> {
	inputClassName?: string
	label: string
	value?: any
	onChange?: (e: any) => void
}
