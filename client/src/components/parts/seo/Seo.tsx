import Container from '@/components/ui/common/container/Container'
import type { ISeo } from '@/shared/interfaces/api/seo/seo.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './Seo.module.scss'

const Seo: FC<ISeo> = ({ seo, className }) => {
	return (
		<section className={formatClassName([styles.section, className])}>
			<Container>
				<div className={styles.seo}>
					<h2 className={styles.heading}>{seo.heading}</h2>
					<div
						className={styles.description}
						dangerouslySetInnerHTML={{ __html: seo.description }}
					/>
				</div>
			</Container>
		</section>
	)
}

export default Seo
