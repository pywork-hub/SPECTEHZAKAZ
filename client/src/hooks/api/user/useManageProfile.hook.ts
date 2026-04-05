import {
	ProfileDocument,
	type ProfileEdit,
	type ProfileUpdateInput,
	useProfileForEditLazyQuery,
	useUpdateProfileMutation,
} from '@/__generated__/output'
import { USER_SUCCESS } from '@/notifications/success/user/user.success'
import { syncForm } from '@/utils/helpers/sync-form/sync-form.util'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useStorage } from '../storage/useStorage.hook'

export const useManageProfile = () => {
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<ProfileEdit>({
		mode: 'onSubmit',
	})

	const [isShow, setIsShow] = useState(false)

	const [getProfile, { loading, error, data: profileData }] =
		useProfileForEditLazyQuery({
			fetchPolicy: 'no-cache',
		})

	const [updateProfileMutation, { loading: isMutationLoading }] =
		useUpdateProfileMutation({
			fetchPolicy: 'no-cache',
			refetchQueries: [ProfileDocument],
			onCompleted: () => {
				closeForm()

				reset()

				return USER_SUCCESS.UPDATE()
			},
		})

	const updateProfile = () => {
		setIsShow(true)

		getProfile({
			onCompleted: ({ profileForEdit }) => {
				syncForm(profileForEdit).forEach((key) => {
					setValue(key, profileForEdit[key])
				})
			},
		})
	}

	const { uploadFiles } = useStorage()

	const onSubmit: SubmitHandler<ProfileUpdateInput> = async (data) => {
		const hasOld = Boolean(data.oldPassword?.trim())
		const hasNew = Boolean(data.newPassword?.trim())

		if ((hasOld && !hasNew) || (!hasOld && hasNew)) {
			toast.error('Пожалуйста, заполните и старый, и новый пароль.')
			return
		}

		let avatarPath = (data.avatarPath || []) as (string | File)[]

		if (Array.isArray(avatarPath) && typeof avatarPath[0] !== 'string') {
			try {
				const filesToUpload = avatarPath.filter(
					(item): item is File => item instanceof File
				)
				const files = await uploadFiles(
					profileData && profileData.profileForEdit.avatarPath.length > 0
						? profileData.profileForEdit.avatarPath
						: [],
					filesToUpload,
					`users/avatars`,
					`avatar`
				)

				if (files && files.length > 0) {
					avatarPath = files
				}
			} catch (error) {
				toast.error('Произошла ошибка, пожалуйста попробуйте позже.')
				return
			}
		}

		await updateProfileMutation({
			variables: {
				data: {
					...data,
					avatarPath: avatarPath as any,
				},
			},
		})
	}

	const closeForm = () => setIsShow(false)

	return {
		updateProfile,
		register,
		control,
		handleSubmit,
		onSubmit,
		errors,
		isFormLoading: loading || !!error,
		isMutationLoading,
		closeForm,
		isShow,
	}
}
