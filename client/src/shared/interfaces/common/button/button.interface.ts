import type { FC } from 'react'

export interface IButton {
	label: string
	href: string
}

export interface IButtonWithIcon extends IButton {
	icon: FC
}
