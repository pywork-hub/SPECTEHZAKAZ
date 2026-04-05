import type { AllHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import type { IGoogleSearchHook } from '../../hooks/google-search/google-search.interface'

export interface IGoogleSearch
	extends IGoogleSearchHook,
		Omit<AllHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
	inputClassName?: string
	label?: string
	error?: FieldError
}
