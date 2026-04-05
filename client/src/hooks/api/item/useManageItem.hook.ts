import {
	type CategoryAttribute,
	type ItemEdit,
	ProfileItemsDocument,
	useDeleteItemMutation,
	useItemForEditLazyQuery,
	usePromoteItemMutation,
	useUpsertItemMutation,
} from '@/__generated__/output'
import { SECURE_ROUTE } from '@/constants/route/route.constants'
import { ITEM_SUCCESS } from '@/notifications/success/item/item.success'
import type { TypeEditForm } from '@/shared/types/hooks/edit-form/edit-form.type'
import { syncForm } from '@/utils/helpers/sync-form/sync-form.util'
import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useStorage } from '../storage/useStorage.hook'

export const useManageItem = (isRedirect?: boolean) => {
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<ItemEdit>({
		mode: 'onSubmit',
	})

	const [attributes, setAttributes] = useState<CategoryAttribute[]>([])

	const [form, setForm] = useState<TypeEditForm>({
		isShow: false,
	})

	const [getItem, { data: itemData, loading, error }] = useItemForEditLazyQuery(
		{
			fetchPolicy: 'no-cache',
		}
	)

	const [promoteItemMutation] = usePromoteItemMutation({
		fetchPolicy: 'no-cache',
		refetchQueries: [ProfileItemsDocument],
		onCompleted: () => ITEM_SUCCESS.PROMOTE(),
	})

	const [deleteItemMutation] = useDeleteItemMutation({
		fetchPolicy: 'no-cache',
		refetchQueries: [ProfileItemsDocument],
		onCompleted: () => ITEM_SUCCESS.DELETE(),
	})

	const [upsertItemMutation, { loading: isMutationLoading }] =
		useUpsertItemMutation({
			fetchPolicy: 'no-cache',
			...(!isRedirect && {
				refetchQueries: [ProfileItemsDocument],
			}),
			onCompleted: ({ upsertItem }) => {
				setForm({
					isShow: false,
				})

				reset()

				if (form.id) {
					ITEM_SUCCESS.MODERATE()

					if (isRedirect) window.location.replace(SECURE_ROUTE.PROFILE)
				} else if (upsertItem) {
					window.location.replace(upsertItem)
				}
			},
		})

	const promoteItem = (id: number) =>
		promoteItemMutation({
			variables: {
				id,
			},
		})
	const deleteItem = (id: number) =>
		deleteItemMutation({
			variables: {
				id,
			},
		})
	const upsertItem = (id?: number) => {
		setForm({
			isShow: true,
			id,
		})

		getItem({
			variables: {
				id,
			},
			onCompleted: ({ itemForEdit }) => {
				const item = itemForEdit.item

				if (!item) return

				syncForm(item).forEach((key) => {
					setValue(key, item[key])
				})

				item.properties.map((property, index) =>
					setValue(`properties.${index}`, property)
				)
			},
		})
	}

	const { uploadFiles } = useStorage()

	const onSubmit: SubmitHandler<ItemEdit> = async (data) => {
		let imagePaths = (data.imagePaths || []) as (string | File)[]
		const initialPaths = itemData?.itemForEdit?.item?.imagePaths || []

		const indexesToReplace: number[] = []
		const filesToUpload: File[] = []

		imagePaths.forEach((item, index) => {
			if (item instanceof File) {
				indexesToReplace.push(index)
				filesToUpload.push(item)
			}
		})

		const currentPaths = imagePaths.filter(
			(p) => typeof p === 'string'
		) as string[]

		const removedOrReplacedPaths = initialPaths.filter(
			(oldPath) => !currentPaths.includes(oldPath)
		)

		if (filesToUpload.length > 0) {
			try {
				const uploadedPaths = await uploadFiles(
					removedOrReplacedPaths,
					filesToUpload,
					`items`,
					`item`,
					true
				)

				if (uploadedPaths && uploadedPaths.length > 0) {
					indexesToReplace.forEach((index, i) => {
						imagePaths[index] = uploadedPaths[i]
					})
				}
			} catch (error) {
				console.error('UPLOAD ERROR:', error)
				toast.error('Произошла ошибка, пожалуйста попробуйте позже.')
				return
			}
		}

		await upsertItemMutation({
			variables: {
				id: form.id,
				data: {
					...data,
					imagePaths: imagePaths as any,
				},
			},
		})
	}

	const closeForm = () =>
		setForm({
			isShow: false,
			id: undefined,
		})

	const categories = itemData?.itemForEdit.categories || []

	const selectedCategory = watch('category')

	useEffect(() => {
		if (selectedCategory) {
			const category = categories.find(
				(cat) => cat.value === selectedCategory.value
			)

			setAttributes(category?.attributes || [])
		}
	}, [selectedCategory, categories])

	return {
		attributes,
		categories,
		regions: itemData?.itemForEdit.regions || [],
		promoteItem,
		deleteItem,
		upsertItem,
		register,
		control,
		handleSubmit,
		onSubmit,
		errors,
		isFormLoading: loading || !!error,
		isMutationLoading,
		closeForm,
		form,
	}
}
