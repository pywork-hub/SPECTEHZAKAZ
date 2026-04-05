import {
	BUYER_ADVANTAGES,
	PROVIDER_ADVANTAGES,
} from '@/base/advantages/advantages.base'
import Advantage from '@/components/parts/advantage/Advantage'
import Container from '@/components/ui/common/container/Container'
import type { FC } from 'react'
import styles from './HomeAdvantages.module.scss'

const HomeAdvantages: FC = () => {
	return (
		<section className={styles.section}>
			<Container>
				<div className={styles.cols}>
					<div className={styles.col}>
						<div className={styles.heading}>Преимущества для заказчиков</div>
						<ul className={styles.advantages}>
							{BUYER_ADVANTAGES.map((advantage, index) => (
								<Advantage
									key={index}
									className={styles.advantage}
									advantage={advantage}
								/>
							))}
						</ul>
					</div>
					<div className={styles.col}>
						<div className={styles.heading}>Преимущества для исполнителей</div>
						<ul className={styles.advantages}>
							{PROVIDER_ADVANTAGES.map((advantage, index) => (
								<Advantage
									key={index}
									className={styles.advantage}
									advantage={advantage}
								/>
							))}
						</ul>
					</div>
				</div>
			</Container>
		</section>
	)
}

export default HomeAdvantages
