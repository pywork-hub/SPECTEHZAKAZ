import toast from 'react-hot-toast'

export const ITEM_SUCCESS = {
	DELETE: () => toast.success('Спецтехника успешно удалена.'),
	MODERATE: () =>
		toast.success('Ваша спецтехника отправлена на проверку модератором.'),
	PROMOTE: () => toast.success('Спецтехника успешно поднята.'),
}
