'use client'

import type { FC } from 'react'
import { Toaster as HotToaster } from 'react-hot-toast'
import styles from './Toaster.module.scss'

const Toaster: FC = () => {
	return (
		<HotToaster
			position="top-right"
			gutter={8}
			containerClassName={styles.toaster}
			toastOptions={{
				duration: 6000,
				error: {
					className: styles.error,
				},
				success: {
					className: styles.success,
				},
			}}
		/>
	)
}

export default Toaster
