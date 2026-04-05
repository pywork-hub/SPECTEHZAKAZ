import { PUBLIC_ROUTE } from '@/constants/route/route.constants'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'

export const useSidebarFilters = () => {
	const itemForm = useForm({
		mode: 'onSubmit',
	})

	const requestForm = useForm({
		mode: 'onSubmit',
	})

	const { push } = useRouter()

	const itemFormOnSubmit: SubmitHandler<any> = (data) => {
		push(PUBLIC_ROUTE.ITEMS(data?.category?.value, data?.region?.value))
	}

	const requestFormOnSubmit: SubmitHandler<any> = (data) => {
		push(PUBLIC_ROUTE.REQUESTS(data?.category?.value, data?.region?.value))
	}

	return {
		itemForm,
		requestForm,
		itemFormOnSubmit,
		requestFormOnSubmit,
	}
}
