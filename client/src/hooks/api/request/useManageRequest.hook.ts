import {
	ProfileRequestsDocument,
	RequestUpsertInput,
	useDeleteRequestMutation,
	usePromoteRequestMutation,
	useRequestForEditLazyQuery,
	useUpsertRequestMutation,
	type RequestEdit,
} from '@/__generated__/output'
import { SECURE_ROUTE } from '@/constants/route/route.constants'
import { REQUEST_SUCCESS } from '@/notifications/success/request/request.success'
import type { TypeEditForm } from '@/shared/types/hooks/edit-form/edit-form.type'
import { syncForm } from '@/utils/helpers/sync-form/sync-form.util'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

export const useManageRequest = (isRedirect?: boolean) => {
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
		watch,
		unregister,
		clearErrors,
	} = useForm<RequestEdit>({
		mode: 'onSubmit',
		defaultValues: {
			price: '500',
			quantity: '1',
		},
	})

	const [form, setForm] = useState<TypeEditForm>({
		isShow: false,
	})

	const [getRequest, { loading, error, data }] = useRequestForEditLazyQuery({
		fetchPolicy: 'no-cache',
	})

	const [promoteRequestMutation] = usePromoteRequestMutation({
		fetchPolicy: 'no-cache',
		refetchQueries: [ProfileRequestsDocument],
		onCompleted: () => REQUEST_SUCCESS.PROMOTE(),
	})

	const [deleteRequestMutation] = useDeleteRequestMutation({
		fetchPolicy: 'no-cache',
		refetchQueries: [ProfileRequestsDocument],
		onCompleted: () => REQUEST_SUCCESS.DELETE(),
	})

	const [upsertRequestMutation, { loading: isMutationLoading }] =
		useUpsertRequestMutation({
			fetchPolicy: 'no-cache',
			...(!isRedirect && {
				refetchQueries: [ProfileRequestsDocument],
			}),
			onCompleted: () => {
				setForm({
					isShow: false,
				})

				reset()

				REQUEST_SUCCESS.MODERATE()

				if (isRedirect) window.location.replace(SECURE_ROUTE.PROFILE)
			},
		})

	const promoteRequest = (id: number) =>
		promoteRequestMutation({
			variables: {
				id,
			},
		})
	const deleteRequest = (id: number) =>
		deleteRequestMutation({
			variables: {
				id,
			},
		})
	const upsertRequest = (id?: number) => {
		setForm({
			isShow: true,
			id,
		})

		getRequest({
			variables: {
				id,
			},
			onCompleted: ({ requestForEdit }) => {
				const request = requestForEdit?.request

				if (!request) return

				syncForm(request).forEach((key) => {
					setValue(key, request[key])
				})
			},
		})
	}

	const onSubmit: SubmitHandler<RequestUpsertInput> = (data) => {
		upsertRequestMutation({
			variables: {
				id: form.id,
				data,
			},
		})
	}

	const closeForm = () =>
		setForm({
			isShow: false,
			id: undefined,
		})

	const handleQuote = () => {
		const price = getValues('price')

		const newPrice = price === null ? '500' : null
		setValue('price', newPrice)

		if (!newPrice) {
			clearErrors('price')
			unregister('price')
			setValue('price', null, { shouldValidate: false })
		} else {
			register('price')
		}
	}

	const isQuote = watch('price') === null ? true : false

	return {
		isQuote,
		handleQuote,
		promoteRequest,
		deleteRequest,
		upsertRequest,
		register,
		control,
		handleSubmit,
		onSubmit,
		setValue,
		errors,
		isFormLoading: loading || !!error,
		isMutationLoading,
		closeForm,
		form,
		categories: data?.requestForEdit.categories || [],
		regions: data?.requestForEdit.regions || [],
	}
}
