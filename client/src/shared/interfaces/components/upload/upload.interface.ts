import type { DropzoneOptions, FileWithPath } from 'react-dropzone'
import type { FieldError } from 'react-hook-form'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IUpload extends IClassName {
	placeholderChar?: string
	placeholder: string
	dragClassName?: string
	itemsClassName?: string
	itemClassName?: string
	label?: string
	error?: FieldError
	value: string[]
	onChange: (value: (string | FileWithPath)[]) => void
	options: DropzoneOptions
}
