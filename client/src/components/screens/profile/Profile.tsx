'use client'

import Container from '@/components/ui/common/container/Container'
import Loader from '@/components/ui/common/loader/Loader'
import Pagination from '@/components/ui/elements/pagination/Pagination'
import { useProfile } from '@/hooks/api/user/useProfile.hook'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import ProfileItems from './items/ProfileItems'
import styles from './Profile.module.scss'
import ProfileRequests from './requests/ProfileRequests'
import ProfileSidebar from './sidebar/ProfileSidebar'

const Profile: FC = () => {
	const {
		isItems,
		profile,
		requests,
		requestsPages,
		items,
		itemsPages,
		isProfileLoading,
		isLoading,
		toggleTab,
		pagination,
	} = useProfile()

	return (
		<>
			<section className={styles.section}>
				<Container>
					<div className={styles.wrapper}>
						{isLoading && isProfileLoading ? (
							<Loader />
						) : (
							<>
								{profile && <ProfileSidebar profile={profile} />}
								<div className={styles.catalog}>
									<div className={styles.tabs}>
										<button
											className={formatClassName([
												styles.tab,
												!isItems && styles.active,
											])}
											onClick={toggleTab}
											disabled={!isItems}
										>
											Мои заказы
										</button>
										<button
											className={formatClassName([
												styles.tab,
												isItems && styles.active,
											])}
											onClick={toggleTab}
											disabled={isItems}
										>
											Моя спецтехника
										</button>
									</div>
									<div className={styles.content}>
										{isLoading ? (
											<Loader />
										) : (
											<>
												<ProfileRequests
													requests={requests}
													isRequests={!isItems}
												/>
												<ProfileItems items={items} isItems={isItems} />
												{(requestsPages > 1 || itemsPages > 1) && (
													<Pagination
														className={styles.pagination}
														pages={requestsPages || itemsPages}
														{...pagination}
													/>
												)}
											</>
										)}
									</div>
								</div>
							</>
						)}
					</div>
				</Container>
			</section>
		</>
	)
}

export default Profile
