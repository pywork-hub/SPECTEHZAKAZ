import toast from 'react-hot-toast'

export const USER_SUCCESS = {
	UPDATE: () => toast.success('Профиль успешно обновлён.'),
	UPDATE_PASSWORD: () =>
		toast.success(
			'Пароль успешно сброшен, можете войти в систему с новым паролем.'
		),
}
