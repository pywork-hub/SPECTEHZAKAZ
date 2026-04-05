import { type RegisterInput, useRegisterMutation } from '@/__generated__/output'
import { SECURE_ROUTE } from '@/constants/route/route.constants'
import { useUser } from '@/context/user/user.context'
import { AUTH_ERROR } from '@/notifications/errors/auth/auth.error'
import { Storage } from '@/shared/enums/storage/storage.enum'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useSendVerification } from './useSendVerification.hook'

export const useRegister = () => {
	const [isVerification, setIsVerification] = useState(false)

	const { setUser } = useUser()

	const [RegisterMutation, { loading }] = useRegisterMutation({
		fetchPolicy: 'no-cache',
	})

	const rememberedData = localStorage.getItem(Storage.AUTH)

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterInput>({
		mode: 'onSubmit',
		defaultValues: {
			isRemember: false,
			...(rememberedData && JSON.parse(rememberedData)),
		},
	})

	const { sendVerification } = useSendVerification()

	const onSubmit: SubmitHandler<RegisterInput> = (data) => {
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
				if (data.isRemember) {
					localStorage.setItem(Storage.AUTH, JSON.stringify(data))
				}
				RegisterMutation({
					variables: { data },
					onCompleted: ({ register }) => {
						if (!register) AUTH_ERROR.REGISTER()
						setUser(register)
						window.location.replace(SECURE_ROUTE.PROFILE)
					},
				})
			}
		)
	}

	return {
		register,
		control,
		handleSubmit,
		onSubmit,
		errors,
		isLoading: loading,
		isVerification,
	}
}
