import type { ChangeEvent } from 'react'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IRange extends IClassName {
	hasLabel?: boolean
	from?: string | null
	to?: string | null
	setFrom: (e: ChangeEvent<HTMLInputElement>) => void
	setTo: (e: ChangeEvent<HTMLInputElement>) => void
}
