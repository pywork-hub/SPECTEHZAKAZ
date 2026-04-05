import type { IClassName } from '@/shared/interfaces/common/class-name/class-name.interface'
import type { FC, PropsWithChildren } from 'react'

const Subscribe: FC<PropsWithChildren<IClassName>> = ({
	children,
	className,
}) => {
	return <button className={className}>{children}</button>
}

export default Subscribe
