import type { TypeStep } from '@/shared/types/parts/step/step.type'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IStep extends IClassName {
	step: TypeStep
}
