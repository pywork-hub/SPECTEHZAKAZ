import type { TypeFeature } from '@/shared/types/parts/feature/feature.type'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IFeature extends IClassName {
	feature: TypeFeature
}
