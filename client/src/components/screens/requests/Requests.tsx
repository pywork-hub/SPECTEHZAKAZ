'use client'

import Request from '@/components/parts/request/Request'
import Seo from '@/components/parts/seo/Seo'
import Contacts from '@/components/templates/contacts/Contacts'
import RequestsFilters from '@/components/templates/requests-filters/RequestsFilters'
import Container from '@/components/ui/common/container/Container'
import Loader from '@/components/ui/common/loader/Loader'
import Pagination from '@/components/ui/elements/pagination/Pagination'
import { useUser } from '@/context/user/user.context'
import { useRequests } from '@/hooks/api/request/useRequests.hook'
import type { IRequestsPage } from '@/shared/interfaces/api/page/page.interface'
import type { FC } from 'react'
import styles from './Requests.module.scss'

const Requests: FC<IRequestsPage> = ({ page }) => {
	const {
		contacts,
		setContacts,
		filters,
		toggleFilter,
		applyFilters,
		pagination,
		requests,
		pages,
		isLoading,
	} = useRequests()

	const { user } = useUser()

	return (
		<>
			<section className={styles.section}>
				<Container>
					<div className={styles.wrapper}>
						<h1 className={styles.heading}>Заказы на спецтехнику</h1>
						<RequestsFilters
							categories={page.categories}
							regions={page.regions}
							filters={filters}
							toggleFilter={toggleFilter}
							apply={applyFilters}
						/>
						{isLoading ? (
							<div className={styles.box}>
								<Loader className={styles.loader} />
							</div>
						) : (
							<div className={styles.content}>
								{requests.length > 0 ? (
									<>
										<h2 className={styles.heading}>
											По вашему запросу найдено: {requests.length} заказов
										</h2>
										<ul className={styles.requests}>
											{requests.map((request) => (
												<Request
													key={request.id}
													className={styles.request}
													request={request}
													onContacts={() =>
														setContacts({
															phone: request.phone,
														})
													}
												/>
											))}
										</ul>
										{pages > 1 && (
											<Pagination
												className={styles.pagination}
												pages={pages}
												{...pagination}
											/>
										)}
									</>
								) : (
									<div className={styles.box}>
										<p className={styles.empty}>Ничего не найдено</p>
									</div>
								)}
							</div>
						)}
					</div>
				</Container>
			</section>
			{page.seo && <Seo className={styles.seo} seo={page.seo} />}
			{contacts && (
				<Contacts
					isNotOpen={!user}
					heading="Контакты заказчика"
					contacts={contacts}
					setContacts={setContacts}
				/>
			)}
		</>
	)
}

export default Requests
