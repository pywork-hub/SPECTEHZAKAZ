import { useSendVerificationMutation } from '@/__generated__/output'

export const useSendVerification = () => {
	const [sendVerificationMutation] = useSendVerificationMutation({
		fetchPolicy: 'no-cache',
	})

	const sendVerification = (token: string, phone: string) =>
		sendVerificationMutation({
			variables: {
				token,
				phone,
			},
		})

	return {
		sendVerification,
	}
}
