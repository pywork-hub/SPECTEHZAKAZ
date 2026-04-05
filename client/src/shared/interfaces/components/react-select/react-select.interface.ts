import type { SelectOption } from '@/__generated__/output'
import type { ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'
import type { Props as IReactSelectProps } from 'react-select'

export interface IReactSelect extends IReactSelectProps {
	label?: ReactNode
	error?: FieldError
	options: SelectOption[]
	value: SelectOption
	inputClassName?: string
}
