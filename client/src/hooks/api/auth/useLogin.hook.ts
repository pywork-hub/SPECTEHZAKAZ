import { useLoginMutation, type LoginInput } from '@/__generated__/output'
import { SECURE_ROUTE } from '@/constants/route/route.constants'
import { useUser } from '@/context/user/user.context'
import { AUTH_ERROR } from '@/notifications/errors/auth/auth.error'
import { Storage } from '@/shared/enums/storage/storage.enum'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

export const useLogin = () => {
	const [isPhone, setIsPhone] = useState(true)

	const { setUser } = useUser()

	const [LoginMutation, { loading }] = useLoginMutation({
		fetchPolicy: 'no-cache',
	})

	const rememberedData = localStorage.getItem(Storage.AUTH)

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		mode: 'onSubmit',
		defaultValues: {
			isRemember: false,
			...(rememberedData && JSON.parse(rememberedData)),
		},
	})

	const onSubmit: SubmitHandler<LoginInput> = (data) => {
		if (data.isRemember) {
			localStorage.setItem(Storage.AUTH, JSON.stringify(data))
		}

		LoginMutation({
			variables: {
				data,
			},
			onCompleted: ({ login }) => {
				if (!login) AUTH_ERROR.LOGIN()

				setUser(login)

				if (typeof window !== 'undefined') {
					window.location.replace(SECURE_ROUTE.PROFILE)
				}
			},
		})
	}

	return {
		register,
		control,
		handleSubmit,
		onSubmit,
		errors,
		isLoading: loading,
		isPhone,
		setIsPhone,
	}
}
