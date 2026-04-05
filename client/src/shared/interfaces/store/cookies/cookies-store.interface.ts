export interface ICookiesStore {
	isSubmitted: boolean
	isAccepted: boolean | null
	isHydrated: boolean
	setIsHydrated: (isHydrated: boolean) => void
	accept: () => void
	decline: () => void
}
