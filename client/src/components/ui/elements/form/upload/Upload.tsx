import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import Image from '@/components/ui/common/image/Image'
import { useDropzone } from '@/hooks/helpers/dropzone/useDropzone.hook'
import type { IUpload } from '@/shared/interfaces/components/upload/upload.interface'
import { formatClassName } from '@/utils/formats/class-name/format-class-name.util'
import type { FC } from 'react'
import { FileWithPath } from 'react-dropzone'
import globalStyles from '../Form.module.scss'
import styles from './Upload.module.scss'

const Upload: FC<IUpload> = ({
	error,
	label,
	placeholder,
	className,
	dragClassName,
	itemsClassName,
	itemClassName,
	value,
	onChange,
	options
}) => {
	const { dropzone, onLeft, onRight, onDelete } = useDropzone({
		options: {
			...options,
			onDropAccepted: (acceptedFiles: FileWithPath[]) => {
				const newFiles = acceptedFiles;

				if (options.multiple) {
					onChange([...value, ...newFiles]);
				} else {
					onChange([newFiles[0]]);
				}
			}
		},
		value,
		onChange
	})

	if(!value) return

	return (
		<div className={formatClassName([globalStyles.field, className])}>
			{label && <label className={globalStyles.label}>{label}</label>}
			{error && <span className={globalStyles.error}>{error.message}</span>}
			{(options.multiple || value.length === 0) && (
				<div className={formatClassName([styles.drag, dropzone.isDragActive && styles.dragged, dragClassName])} {...dropzone.getRootProps()}>
					<span>{placeholder}</span>
				</div>
			)}
			{value.length >= 1 && (
				<ul className={formatClassName([styles.items, itemsClassName])}>
					{value.map((file, index) => (
						<li key={index} className={formatClassName([styles.item, itemClassName])}>
							{index !== 0 && (
								<button type="button" className={styles.prev} onClick={() => onLeft(index)}>
									<ChevronLeftIcon />
								</button>
							)}
							<Image
								src={typeof file === 'string' ? file : URL.createObjectURL(file)}
								alt=""
							/>
							<button
								type="button"
								className={styles.delete}
								onClick={() => onDelete(index)}
							>
								<TrashIcon />
							</button>
							{value.length - 1 !== index && (
								<button type="button" className={styles.next} onClick={() => onRight(index)}>
									<ChevronRightIcon />
								</button>
							)}
						</li>
					))}
				</ul>
			)}
			<input {...dropzone.getInputProps()} />
		</div>
	);
};

export default Upload;
