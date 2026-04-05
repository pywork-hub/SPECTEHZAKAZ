export const formatClassName = (
	classNames: (string | boolean | undefined | null)[]
): string => {
	return classNames.filter(Boolean).join(' ')
}
