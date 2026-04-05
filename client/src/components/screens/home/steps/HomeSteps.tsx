import { STEPS } from '@/base/steps/steps.base'
import Step from '@/components/parts/step/Step'
import Container from '@/components/ui/common/container/Container'
import type { FC } from 'react'
import styles from './HomeSteps.module.scss'

const HomeSteps: FC = () => {
	return (
		<section className={styles.section}>
			<Container>
				<ul className={styles.steps}>
					{STEPS.map((step, index) => (
						<Step key={index} className={styles.step} step={step} />
					))}
				</ul>
			</Container>
		</section>
	)
}

export default HomeSteps
