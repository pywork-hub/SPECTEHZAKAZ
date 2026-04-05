import type { IImage } from '@/shared/interfaces/common/image/image.interface'
import type { FC } from 'react'

const Image: FC<IImage> = ({ src, alt }) => {
	return <img src={src} alt={alt} loading="lazy" />
}

export default Image
