'use client'

import Auth from '@/components/templates/auth/Auth'
import ItemForm from '@/components/templates/forms/item/ItemForm'
import RequestForm from '@/components/templates/forms/request/RequestForm'
import Modal from '@/components/templates/modal/Modal'
import Image from '@/components/ui/common/image/Image'
import { useUser } from '@/context/user/user.context'
import { useManageItem } from '@/hooks/api/item/useManageItem.hook'
import { useManageRequest } from '@/hooks/api/request/useManageRequest.hook'
import { useAuth } from '@/hooks/components/auth/useAuth.hook'
import type { IFeature } from '@/shared/interfaces/parts/feature/feature.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import styles from './Feature.module.scss'

const Feature: FC<IFeature> = ({ feature, className }) => {
	const { user } = useUser()

	const { isLogin, isRegister, type, setType, close } = useAuth()

	const { upsertItem, ...item } = useManageItem(true)
	const { upsertRequest, ...request } = useManageRequest(true)

	return (
		<li
			className={formatClassName([
				styles.feature,
				styles[feature.scheme],
				className,
			])}
		>
			<div className={styles.left}>
				<div className={styles.heading}>{feature.heading}</div>
				<p className={styles.description}>{feature.description}</p>
			</div>
			<div className={styles.right}>
				<Image {...feature.image} />
				<button
					className={styles.button}
					onClick={
						!user
							? () => setType('register')
							: feature.isOrder
							? () => upsertRequest()
							: () => upsertItem()
					}
				>
					{feature.button}
				</button>
				{type && (
					<Auth
						isLogin={isLogin}
						isRegister={isRegister}
						setType={setType}
						close={close}
					/>
				)}
				{feature.isOrder
					? request.form.isShow &&
					  !request.isFormLoading && (
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
					  )
					: item.form.isShow &&
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
					  )}
			</div>
		</li>
	)
}

export default Feature
