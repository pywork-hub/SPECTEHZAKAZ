import {
	useLeaveReviewMutation,
	type LeaveReviewInput,
} from '@/__generated__/output'
import { REVIEW_SUCCESS } from '@/notifications/success/review/review.success'
import type { ICurrentItem } from '@/shared/interfaces/api/item/item.interface'
import { useForm, type SubmitHandler } from 'react-hook-form'

export const useLeaveReview = ({ item }: ICurrentItem) => {
	const {
		register,
		reset,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LeaveReviewInput>({
		mode: 'onSubmit',
		defaultValues: {
			itemId: item.id,
		},
	})

	const [leaveReviewMutation, { loading }] = useLeaveReviewMutation({
		fetchPolicy: 'no-cache',
		onCompleted: () => {
			reset()

			return REVIEW_SUCCESS.LEAVE()
		},
	})

	const onSubmit: SubmitHandler<LeaveReviewInput> = (data) =>
		leaveReviewMutation({
			variables: {
				data,
			},
		})

	return {
		register,
		reset,
		control,
		handleSubmit,
		onSubmit,
		errors,
		isLoading: loading,
	}
}
