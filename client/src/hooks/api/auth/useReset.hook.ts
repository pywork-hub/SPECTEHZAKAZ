import {
	useUpdatePasswordMutation,
	type UpdatePasswordInput,
} from '@/__generated__/output'
import { USER_ERROR } from '@/notifications/errors/user/user.error'
import { USER_SUCCESS } from '@/notifications/success/user/user.success'
import type { IAuthState } from '@/shared/interfaces/components/auth/auth.interface'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useSendVerification } from './useSendVerification.hook'

export const useReset = ({ setType }: IAuthState) => {
	const [isVerification, setIsVerification] = useState(false)
	const [isVerified, setIsVerified] = useState(false)

	const [UpdatePasswordMutation, { loading }] = useUpdatePasswordMutation({
		fetchPolicy: 'no-cache',
	})

	const verificationForm = useForm<{ phone: string }>({
		mode: 'onSubmit',
	})

	const resetForm = useForm<UpdatePasswordInput>({
		mode: 'onSubmit',
	})

	const { sendVerification } = useSendVerification()

	const verificationOnSubmit: SubmitHandler<{ phone: string }> = (data) => {
		const widgetId = 'widget'

		const container = document.getElementById(widgetId)

		if (!container) return

		setIsVerification(true)

		container.style.display = 'block'

		const phone = data.phone.replace(/\D/g, '')

		// @ts-ignore
		window.VerifyWidget.mount(
			`#${widgetId}`,
			{
				destination: phone,
				widgetId: process.env.WIDGET_ID,
				captchaSiteKey: process.env.CAPTCHA_TOKEN,
			},
			(token: string) => {
				sendVerification(token, data.phone)
			},
			() => {
				setIsVerified(true)
				resetForm.setValue('phone', data.phone)
			}
		)
	}

	const resetOnSubmit: SubmitHandler<UpdatePasswordInput> = (data) =>
		UpdatePasswordMutation({
			variables: { data },
			onCompleted: ({ updatePassword }) => {
				if (!updatePassword) {
					return USER_ERROR.UPDATE_PASSWORD()
				}

				USER_SUCCESS.UPDATE_PASSWORD()
				setType('login')
			},
		})

	return {
		resetForm,
		resetOnSubmit,
		verificationForm,
		verificationOnSubmit,
		isVerified,
		isVerification,
		isLoading: loading,
	}
}
