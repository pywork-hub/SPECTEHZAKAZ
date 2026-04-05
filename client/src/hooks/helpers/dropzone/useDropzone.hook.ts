import type { IDropzone } from '@/shared/interfaces/common/dropzone/dropzone.interface'
import {
	useDropzone as useReactDropzone
} from 'react-dropzone'
import toast from 'react-hot-toast'

export const useDropzone = ({ value, options, onChange }: IDropzone) => {
	const dropzone = useReactDropzone({
		...options,
		maxSize: 10 * 1024 * 1024,
		accept: {
			'image/png': ['.png'],
			'image/jpeg': ['.jpg', '.jpeg'],
		},
		onDropRejected: (rejectedFiles) => {
			let uniqueErrorCodes = new Set<string>()

			rejectedFiles.forEach((file) => {
				file.errors.forEach(({ code }) => {
					uniqueErrorCodes.add(code)
				})
			})

			uniqueErrorCodes.forEach((code) => {
				if (code === 'file-invalid-type') {
					toast.error(`Поддерживаются только png, jpg.`)
				} else if (code === 'file-too-large') {
					toast.error('Размер файла должен быть не больше 10 МБ.')
				} else if (code === 'too-many-files') {
					toast.error('Можно загрузить только один файл.')
				} else {
					toast.error('Произошла ошибка, попробуйте выбрать другой файл.')
				}
			})
		},
	})

	const onLeft = (index: number) => {
		if (index > 0) {
			const newFiles = [...value];
			[newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
			onChange(newFiles);
		}
	};

	const onRight = (index: number) => {
		if (index < value.length - 1) {
			const newFiles = [...value];
			[newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
			onChange(newFiles);
		}
	};
	
	const onDelete = (index: number) => {
		if(options.multiple) {
			const newFiles = [...value];
			newFiles.splice(index, 1);
			onChange(newFiles);
		} else {
			onChange([]);
		}
	};

	return {
		dropzone,
		onLeft,
		onRight,
		onDelete
	}
}
