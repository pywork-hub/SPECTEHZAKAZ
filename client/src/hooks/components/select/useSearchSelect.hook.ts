import { useOutside } from '@/hooks/helpers/outside/useOutside.hook'
import type { ISelectHook } from '@/shared/interfaces/hooks/select/select.interface'
import { useState } from 'react'

export const useSearchSelect = ({ options }: ISelectHook) => {
	const { ref, buttonRef, isShow, setIsShow } = useOutside<HTMLDivElement>()

	const [searchTerm, setSearchTerm] = useState('')

	const availableOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return {
		ref,
		buttonRef,
		isShow,
		setIsShow,
		searchTerm,
		setSearchTerm,
		availableOptions,
	}
}
