import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IRadio extends IClassName {
	isChecked?: boolean
	description: string
	setRadio: () => void
}
