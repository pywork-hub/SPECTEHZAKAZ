import Container from '@/components/ui/common/container/Container'
import type { IPolicy } from '@/shared/interfaces/components/policy/policy.interface'
import type { FC } from 'react'
import styles from './Policy.module.scss'

const Policy: FC<IPolicy> = ({ heading, content }) => {
	return (
		<section className={styles.policy}>
			<Container>
				<div className={styles.wrapper}>
					<h1 className={styles.heading}>{heading}</h1>
					<div
						className={styles.content}
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				</div>
			</Container>
		</section>
	)
}

export default Policy
