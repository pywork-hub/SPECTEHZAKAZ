'use client'

import Item from '@/components/parts/item/Item'
import Seo from '@/components/parts/seo/Seo'
import Contacts from '@/components/templates/contacts/Contacts'
import ItemsFilters from '@/components/templates/items-filters/ItemsFilters'
import Container from '@/components/ui/common/container/Container'
import Loader from '@/components/ui/common/loader/Loader'
import Pagination from '@/components/ui/elements/pagination/Pagination'
import { useItems } from '@/hooks/api/item/useItems.hook'
import type { IItemsPage } from '@/shared/interfaces/api/page/page.interface'
import type { FC } from 'react'
import styles from './Items.module.scss'

const Items: FC<IItemsPage> = ({ page }) => {
	const {
		contacts,
		setContacts,
		filters,
		toggleFilter,
		changeFilter,
		applyFilters,
		pagination,
		items,
		pages,
		isLoading,
	} = useItems()

	return (
		<>
			<section className={styles.section}>
				<Container>
					<div className={styles.wrapper}>
						<h1 className={styles.heading}>Услуги спецтехники</h1>
						<ItemsFilters
							categories={page.categories}
							regions={page.regions}
							filters={filters}
							toggleFilter={toggleFilter}
							changeFilter={changeFilter}
							apply={applyFilters}
						/>
						{isLoading ? (
							<div className={styles.box}>
								<Loader className={styles.loader} />
							</div>
						) : (
							<div className={styles.content}>
								{items.length > 0 ? (
									<>
										<h2 className={styles.heading}>
											По вашему запросу найдено: {items.length} исполнителей
										</h2>
										<ul className={styles.items}>
											{items.map((item) => (
												<Item
													key={item.id}
													className={styles.item}
													item={item}
													onContacts={() =>
														setContacts({
															phone: item.user.phone,
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
					heading="Контакты исполнителя"
					contacts={contacts}
					setContacts={setContacts}
				/>
			)}
		</>
	)
}

export default Items
