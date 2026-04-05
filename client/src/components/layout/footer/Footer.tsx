'use client'

import { FOOTER_PAGES } from '@/base/pages/pages.base'
import ReceiptIcon from '@/components/icons/ReceiptIcon'
import TractorIcon from '@/components/icons/TractorIcon'
import Auth from '@/components/templates/auth/Auth'
import ItemForm from '@/components/templates/forms/item/ItemForm'
import RequestForm from '@/components/templates/forms/request/RequestForm'
import Modal from '@/components/templates/modal/Modal'
import Container from '@/components/ui/common/container/Container'
import Logo from '@/components/ui/elements/logo/Logo'
import { COMPANY_NAME } from '@/constants/global/global.constants'
import { PUBLIC_ROUTE } from '@/constants/route/route.constants'
import { useUser } from '@/context/user/user.context'
import { useManageItem } from '@/hooks/api/item/useManageItem.hook'
import { useManageRequest } from '@/hooks/api/request/useManageRequest.hook'
import { useAuth } from '@/hooks/components/auth/useAuth.hook'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'
import styles from './Footer.module.scss'

const Footer: FC = () => {
	const pathname = usePathname()
	const { user } = useUser()

	const { isLogin, isRegister, type, setType, close } = useAuth()

	const { upsertItem, ...item } = useManageItem(true)
	const { upsertRequest, ...request } = useManageRequest(true)

	return (
		<footer
			className={formatClassName([
				styles.footer,
				pathname.includes(PUBLIC_ROUTE.CONTACTS) && styles.simple,
			])}
		>
			<Container>
				<div className={styles.wrapper}>
					<div className={styles.fill}>
						<div className={styles.about}>
							<Logo className={styles.logo} />
							<div className={styles.heading}>Биржа услуг спецтехники</div>
							<p className={styles.description}>
								Удобный поиск заказчиков и исполнителей услуг спецтехники.
							</p>
						</div>
						<div className={styles.cols}>
							<div className={styles.col}>
								<div className={styles.label}>Для заказчиков:</div>
								<button
									className={styles.button}
									onClick={
										!user ? () => setType('register') : () => upsertRequest()
									}
								>
									<ReceiptIcon />
									<span>Добавить заказ</span>
								</button>
								<Link className={styles.button} href={PUBLIC_ROUTE.ITEMS()}>
									<TractorIcon />
									<span>Найти технику</span>
								</Link>
							</div>
							<div className={styles.col}>
								<div className={styles.label}>Для исполнителей:</div>
								<button
									className={styles.button}
									onClick={
										!user ? () => setType('register') : () => upsertItem()
									}
								>
									<TractorIcon />
									<span>Добавить технику</span>
								</button>
								<Link className={styles.button} href={PUBLIC_ROUTE.REQUESTS()}>
									<ReceiptIcon />
									<span>Найти заказ</span>
								</Link>
							</div>
						</div>
					</div>
					<div className={styles.menu}>
						<ul className={styles.list}>
							{FOOTER_PAGES.map((page, index) => (
								<li key={index} className={styles.item}>
									<Link className={styles.link} href={page.href}>
										{page.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<p className={styles.copyright}>
						2025 (c) {COMPANY_NAME}. Все права защищены.
					</p>
					{type && (
						<Auth
							isLogin={isLogin}
							isRegister={isRegister}
							setType={setType}
							close={close}
						/>
					)}
					{request.form.isShow && !request.isFormLoading ? (
						<Modal
							className={styles.form}
							heading={'Оформление заказа'}
							close={request.closeForm}
						>
							<RequestForm
								categories={request.categories}
								regions={request.regions}
								isFormLoading={request.isFormLoading}
								isMutationLoading={request.isMutationLoading}
								register={request.register}
								control={request.control}
								errors={request.errors}
								onSubmit={request.handleSubmit(request.onSubmit)}
								isUpdate={!!request.form.id}
								isQuote={request.isQuote}
								handleQuote={request.handleQuote}
							/>
						</Modal>
					) : (
						item.form.isShow &&
						!item.isFormLoading && (
							<Modal
								className={styles.form}
								heading="Оформление объявления"
								close={item.closeForm}
							>
								<ItemForm
									attributes={item.attributes}
									categories={item.categories}
									regions={item.regions}
									isFormLoading={item.isFormLoading}
									isMutationLoading={item.isMutationLoading}
									register={item.register}
									control={item.control}
									errors={item.errors}
									onSubmit={item.handleSubmit(item.onSubmit)}
									isUpdate={!!item.form.id}
								/>
							</Modal>
						)
					)}
				</div>
			</Container>
		</footer>
	)
}

export default Footer
