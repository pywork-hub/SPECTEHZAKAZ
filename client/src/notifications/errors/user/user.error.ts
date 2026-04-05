import toast from 'react-hot-toast'

export const USER_ERROR = {
	UPDATE_PASSWORD: () => {
		toast.error('Не удалось сбросить пароль. Пожалуйста, попробуйте позже.')
	},
}
