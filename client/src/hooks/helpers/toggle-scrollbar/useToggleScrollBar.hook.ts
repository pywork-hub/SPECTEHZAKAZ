export const useToggleScrollBar = (isHidden: boolean) => {
	const body = document.querySelector('body')

	if (!body) return

	body.style.overflow = isHidden ? 'hidden' : 'visible'
}
