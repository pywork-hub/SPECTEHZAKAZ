import { STORAGE_ERROR } from '@/notifications/errors/storage/storage.error'
import { getDate } from '@/utils/helpers/date/get-date.util'
import AWS from 'aws-sdk'
import imageCompression from 'browser-image-compression'
import { extname } from 'path'
import { v4 as uuid } from 'uuid'

export const useStorage = () => {
	const s3 = new AWS.S3({
		accessKeyId: process.env.STORAGE_ID,
		secretAccessKey: process.env.STORAGE_TOKEN,
		endpoint: process.env.STORAGE_URL,
		s3ForcePathStyle: true,
	})

	const isWebPSupported = () => {
		const elem = document.createElement('canvas')
		if (!!(elem.getContext && elem.getContext('2d'))) {
			return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
		}
		return false
	}

	const optimizeImage = async (file: File) => {
		try {
			const options = {
				fileType: isWebPSupported() ? 'image/webp' : file.type,
				useWebWorker: true,
				maxSizeMB: 10,
			}
			const compressedFile = await imageCompression(file, options)

			return compressedFile
		} catch (error) {
			return file
		}
	}

	const deleteFile = async (filePath: string) => {
		const key = filePath.startsWith('/') ? filePath.slice(1) : filePath

		const params = { Bucket: process.env.STORAGE_BUCKET as string, Key: key }

		try {
			return s3.deleteObject(params).promise()
		} catch (e) {
			console.error(e)
			STORAGE_ERROR()
		}
	}

	const uploadFiles = async (
		oldFilePaths: string[],
		files: File[],
		folder: string,
		slug: string,
		isByIndex?: boolean
	) => {
		const uploadPromises = await Promise.all(
			files.map(async (file, index) => {
				const optimizedFile = await optimizeImage(file)

				const key = `storage/images/${folder}/${slug}-${
					isByIndex ? `${index + 1}-` : ''
				}${uuid()}-${getDate()}${extname(optimizedFile.name)}`

				try {
					return s3
						.upload({
							Bucket: process.env.STORAGE_BUCKET as string,
							Key: key,
							Body: optimizedFile,
							ContentType: optimizedFile.type,
							ACL: 'public-read',
						})
						.promise()
				} catch (e) {
					console.error(e)
					STORAGE_ERROR()
				}
			})
		)

		if (oldFilePaths.length > 0) {
			await Promise.all(oldFilePaths.map(deleteFile))
		}

		const uploadedFiles = await Promise.all(uploadPromises)
		
		return uploadedFiles.map((file: any) => `/${file.Key}`)
	}

	return {
		uploadFiles,
	}
}
