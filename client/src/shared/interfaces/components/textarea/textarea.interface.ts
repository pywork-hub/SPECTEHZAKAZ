import type { AllHTMLAttributes, ChangeEvent } from 'react'
import type { FieldError } from 'react-hook-form'

export interface ITextarea extends AllHTMLAttributes<HTMLTextAreaElement> {
	textareaClassName?: string
	label?: string
	error?: FieldError
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
