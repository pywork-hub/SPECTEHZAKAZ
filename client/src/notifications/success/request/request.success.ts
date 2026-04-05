import toast from 'react-hot-toast'

export const REQUEST_SUCCESS = {
	DELETE: () => toast.success('Заказ успешно удален.'),
	CREATE: () => toast.success('Заказ успешно создан.'),
	UPDATE: () => toast.success('Заказ успешно обновлен.'),
	MODERATE: () => toast.success('Ваш заказ отправлен на проверку модератором.'),
	PROMOTE: () => toast.success('Заказ успешно поднят.'),
}
