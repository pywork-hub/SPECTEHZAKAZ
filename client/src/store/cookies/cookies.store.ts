import { useToggleScrollBar } from '@/hooks/helpers/toggle-scrollbar/useToggleScrollBar.hook'
import { Storage } from '@/shared/enums/storage/storage.enum'
import type { ICookiesStore } from '@/shared/interfaces/store/cookies/cookies-store.interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCookiesStore = create<ICookiesStore>()(
	persist(
		(set) => ({
			isSubmitted: false,
			isAccepted: null,
			isHydrated: false,
			setIsHydrated: (isHydrated) => set({ isHydrated }),
			accept: () => {
				set({ isSubmitted: true, isAccepted: true })
				useToggleScrollBar(false)
			},
			decline: () => {
				set({ isSubmitted: true, isAccepted: false })
				useToggleScrollBar(false)
			},
		}),
		{
			name: Storage.COOKIES,
			onRehydrateStorage: () => (state) => {
				state?.setIsHydrated(true)
			},
		}
	)
)
