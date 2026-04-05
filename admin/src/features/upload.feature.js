import AWS from 'aws-sdk'
import { extname } from 'path'
import { v4 as uuid } from 'uuid'
import { getDate } from '../utils/helpers/date/get-date.util.js'

const s3 = new AWS.S3({
	accessKeyId: process.env.STORAGE_ID,
	secretAccessKey: process.env.STORAGE_TOKEN,
	endpoint: process.env.STORAGE_URL,
	s3ForcePathStyle: true,
	signatureVersion: 'v4',
	region: 'ru-1',
})

const deleteFile = async filePath => {
	if (!filePath) return

	const key = filePath.startsWith('/') ? filePath.slice(1) : filePath

	const params = { Bucket: process.env.STORAGE_BUCKET, Key: key }

	try {
		await s3.deleteObject(params).promise()
	} catch (e) {
		console.warn('Ошибка при удалении файла из S3:', e)
	}
}

export const uploadFiles = async ({
	request,
	context,
	fields,
	folders,
	slugs,
}) => {
	const uploadedFiles = context?.uploadedFiles || {}
	const oldFilePaths = context?.record?.params || {}

	const updatedPayload = {}

	for (let i = 0; i < fields.length; i++) {
		const field = fields[i]
		const folder = folders[i]
		const slug = slugs[i]

		const newFiles = uploadedFiles[field]
		const oldFiles = oldFilePaths[field]

		if (!newFiles) continue

		const newFilesArray = Array.isArray(newFiles) ? newFiles : [newFiles]
		const oldFilesArray = Array.isArray(oldFiles)
			? oldFiles
			: oldFiles
			? [oldFiles]
			: []

		await Promise.all(oldFilesArray.map(deleteFile))

		const uploadedPaths = await Promise.all(
			newFilesArray.map(async file => {
				const ext = extname(file.name) || '.webp'
				const fileName = `${slug}-${uuid()}-${getDate()}${ext}`
				const key = `storage/images/${folder}/${fileName}`

				await s3
					.upload({
						Bucket: process.env.STORAGE_BUCKET,
						Key: key,
						Body: file.buffer,
						ContentType: file.type,
						ACL: 'public-read',
					})
					.promise()

				return `/${key}`
			})
		)

		updatedPayload[field] =
			uploadedPaths.length === 1 ? uploadedPaths[0] : uploadedPaths
	}

	for (const [field, path] of Object.entries(updatedPayload)) {
		request.payload[field] = path
	}

	return request
}
