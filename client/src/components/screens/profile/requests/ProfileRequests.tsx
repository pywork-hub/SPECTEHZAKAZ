import PlusCircleIcon from '@/components/icons/PlusCircleIcon'
import Request from '@/components/parts/request/Request'
import RequestForm from '@/components/templates/forms/request/RequestForm'
import Modal from '@/components/templates/modal/Modal'
import { useManageRequest } from '@/hooks/api/request/useManageRequest.hook'
import type { IProfileRequests } from '@/shared/interfaces/api/profile-request/profile-request.interface'
import type { FC } from 'react'
import styles from './ProfileRequests.module.scss'

const ProfileRequests: FC<IProfileRequests> = ({ requests, isRequests }) => {
	const {
		categories,
		regions,
		promoteRequest,
		deleteRequest,
		upsertRequest,
		register,
		control,
		handleSubmit,
		onSubmit,
		errors,
		isFormLoading,
		isMutationLoading,
		form,
		closeForm,
		setValue,
		isQuote,
		handleQuote,
	} = useManageRequest()

	return (
		<>
			{requests.length > 0 && (
				<ul className={styles.list}>
					{requests.map((request) => (
						<Request
							key={request.id}
							request={request as any}
							isSecured
							onPromote={() => promoteRequest(request.id)}
							onEdit={() => upsertRequest(request.id)}
							onDelete={() => deleteRequest(request.id)}
						/>
					))}
				</ul>
			)}
			{isRequests && (
				<button className={styles.add} onClick={() => upsertRequest()}>
					<PlusCircleIcon />
					<span>Добавить заказ</span>
				</button>
			)}
			{form.isShow && !isFormLoading && (
				<Modal
					className={styles.form}
					heading={'Оформление заказа'}
					close={closeForm}
				>
					<RequestForm
						categories={categories}
						regions={regions}
						isFormLoading={isFormLoading}
						isMutationLoading={isMutationLoading}
						register={register}
						control={control}
						errors={errors}
						onSubmit={handleSubmit(onSubmit)}
						isUpdate={!!form.id}
						isQuote={isQuote}
						handleQuote={handleQuote}
					/>
				</Modal>
			)}
		</>
	)
}

export default ProfileRequests
