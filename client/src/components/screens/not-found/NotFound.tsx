import Container from '@/components/ui/common/container/Container'
import { PUBLIC_ROUTE } from '@/constants/route/route.constants'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './NotFound.module.scss'

const NotFound: FC = () => {
	return (
		<section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<h1 className={styles.heading}>Страница не найдена</h1>
					<p className={styles.description}>
						Извините, мы не смогли найти запрашиваемую страницу.
					</p>
					<Link className={styles.button} href={PUBLIC_ROUTE.HOME}>
						Вернуться на главную
					</Link>
				</div>
			</Container>
		</section>
	)
}

export default NotFound
