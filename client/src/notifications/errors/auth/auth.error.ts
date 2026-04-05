import toast from 'react-hot-toast'

export const AUTH_ERROR = {
	REGISTER: () => {
		toast.error('Не удалось зарегистрироваться. Пожалуйста, попробуйте позже.')
	},
	LOGIN: () => {
		toast.error('Не удалось войти в систему. Пожалуйста, попробуйте позже.')
	},
	LOGOUT: () => {
		toast.error('Не удалось выйти из системы. Пожалуйста, попробуйте позже.')
	},
}
