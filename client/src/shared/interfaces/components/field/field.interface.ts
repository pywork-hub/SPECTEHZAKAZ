import type { AllHTMLAttributes, PropsWithChildren } from 'react'
import type { FieldError } from 'react-hook-form'

export interface IField
	extends Omit<AllHTMLAttributes<HTMLInputElement>, 'value'>,
		PropsWithChildren {
	mask?: any
	lazy?: boolean
	autofix?: boolean
	placeholderChar?: string
	inputClassName?: string
	label?: string
	error?: FieldError
	value?: string | null
	onChange?: (e: any) => void
	isHidden?: boolean
}
