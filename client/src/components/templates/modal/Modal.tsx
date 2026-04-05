'use client'

import CloseIcon from '@/components/icons/CloseIcon'
import type { IModal } from '@/shared/interfaces/components/modal/modal.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import { useRef, type FC } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'

const Modal: FC<IModal> = ({ heading, children, close, className }) => {
	const modalRef = useRef<HTMLElement | null>(document.getElementById('body'))

	if (!modalRef.current) return null

	return ReactDOM.createPortal(
		<div className={styles.overlay}>
			<div className={formatClassName([styles.modal, className])}>
				<div className={styles.head}>
					{heading && <h4 className={styles.heading}>{heading}</h4>}
					<button className={styles.close} onClick={close}>
						<CloseIcon />
					</button>
				</div>
				<div className={styles.box}>{children}</div>
			</div>
		</div>,
		modalRef.current
	)
}

export default Modal
