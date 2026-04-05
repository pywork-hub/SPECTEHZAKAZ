import type { IImage } from '@/shared/interfaces/common/image/image.interface'

export type TypeFeature = {
	heading: string
	description: string
	image: IImage
	button: string
	isOrder?: boolean
	scheme: 'gray' | 'orange'
}
