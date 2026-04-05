import Seo from '@/components/parts/seo/Seo'
import type { IHomePage } from '@/shared/interfaces/api/page/page.interface'
import type { FC } from 'react'
import HomeAdvantages from './advantages/HomeAdvantages'
import HomeBanner from './banner/HomeBanner'
import HomeCatalog from './catalog/HomeCatalog'
import HomeFaq from './faq/HomeFaq'
import styles from './Home.module.scss'
import HomeSteps from './steps/HomeSteps'

const Home: FC<IHomePage> = ({ page }) => {
	return (
		<>
			<HomeBanner />
			<HomeCatalog
				categories={page.categories}
				itemRegions={page.itemRegions}
				requestRegions={page.requestRegions}
			/>
			<HomeAdvantages />
			<HomeSteps />
			{page.seo && <Seo className={styles.seo} seo={page.seo} />}
			{page.faqs.length > 0 && <HomeFaq faqs={page.faqs} />}
		</>
	)
}

export default Home
