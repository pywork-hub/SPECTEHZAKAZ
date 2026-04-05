export const CONFIRM_VALIDATION = (form: any, field: string, name: string) => ({
	validate: (value: string) =>
		value === form.watch(field) || `${name} не совпадают`,
})
