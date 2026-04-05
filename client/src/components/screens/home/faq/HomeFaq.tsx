import Accordion from '@/components/parts/accordion/Accordion'
import Container from '@/components/ui/common/container/Container'
import type { IFaqs } from '@/shared/interfaces/api/faq/faq.interface'
import type { FC } from 'react'
import styles from './HomeFaq.module.scss'

const HomeFaq: FC<IFaqs> = ({ faqs }) => {
	return (
		<section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					<div className={styles.content}>
						<div className={styles.heading}>
							Ответы на часто задаваемые вопросы
						</div>
						<ul className={styles.accordions}>
							{faqs.map((faq, index) => (
								<Accordion key={index} className={styles.accordion} faq={faq} />
							))}
						</ul>
					</div>
				</div>
			</Container>
		</section>
	)
}

export default HomeFaq
