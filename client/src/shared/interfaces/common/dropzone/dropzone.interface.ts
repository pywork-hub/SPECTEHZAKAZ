import type {
	DropzoneOptions
} from 'react-dropzone'

export interface IDropzone {
	value: string[]
	options: DropzoneOptions
	onChange: (value: string[]) => void
}
