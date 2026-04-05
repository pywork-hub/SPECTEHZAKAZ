import { FEATURES } from '@/base/features/features.base'
import Category from '@/components/parts/category/Category'
import Feature from '@/components/parts/feature/Feature'
import SidebarFilters from '@/components/templates/sidebar-filters/SidebarFilters'
import Container from '@/components/ui/common/container/Container'
import type { IHomeCatalog } from '@/shared/interfaces/components/home/home.interface'
import type { FC } from 'react'
import styles from './HomeCatalog.module.scss'

const HomeCatalog: FC<IHomeCatalog> = ({
	categories,
	itemRegions,
	requestRegions,
}) => {
	return (
		<section className={styles.section}>
			<Container>
				<div className={styles.catalog}>
					<div className={styles.content}>
						<ul className={styles.features}>
							{FEATURES.map((feature, index) => (
								<Feature
									key={index}
									className={styles.feature}
									feature={feature}
								/>
							))}
						</ul>
						{categories.length > 0 && (
							<ul className={styles.categories}>
								{categories.map((category) => (
									<Category
										key={category.slug}
										className={styles.category}
										category={category}
									/>
								))}
							</ul>
						)}
					</div>
					<div className={styles.sidebar}>
						<SidebarFilters
							categories={categories}
							itemRegions={itemRegions}
							requestRegions={requestRegions}
						/>
					</div>
				</div>
			</Container>
		</section>
	)
}

export default HomeCatalog
