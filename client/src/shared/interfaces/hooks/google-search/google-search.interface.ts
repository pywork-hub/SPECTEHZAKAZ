import type { SelectOption } from '@/__generated__/output'

export interface IGoogleSearchHook {
	allowedRegions: SelectOption[]
	value: string
	onChange: (address: string) => void
}
