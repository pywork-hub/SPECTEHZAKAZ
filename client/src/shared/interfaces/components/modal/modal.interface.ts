import type { PropsWithChildren } from 'react'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IModal extends PropsWithChildren<IClassName> {
	heading?: string
	close: () => void
}
