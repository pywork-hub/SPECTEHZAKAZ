import type { FieldError } from 'react-hook-form'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IStarField extends IClassName {
	label: string
	value: number
	error?: FieldError
	onChange: (e: any) => void
}
