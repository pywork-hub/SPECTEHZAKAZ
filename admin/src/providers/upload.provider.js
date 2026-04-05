import { BaseProvider } from '@adminjs/upload'
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
import sharp from 'sharp'

dotenv.config()

export class UploadProvider extends BaseProvider {
    constructor(uploadContext) {
        super()
        this.s3 = new AWS.S3({
            endpoint: process.env.STORAGE_URL,
            region: 'ru-1',
            accessKeyId: process.env.STORAGE_ID,
            secretAccessKey: process.env.STORAGE_TOKEN,
            s3ForcePathStyle: true,
            signatureVersion: 'v4',
        })
        this.bucket = process.env.STORAGE_BUCKET
        this.baseUrl = process.env.CLOUD_URL
        this.uploadContext = uploadContext || {}
    }

    async optimizeImage(file, options = {}) {
        return await sharp(file.path)
            .resize({
                // ...options,
                withoutEnlargement: true,
            })
            .webp({ quality: 100 })
            .toBuffer()
    }

    async upload(file, key, context) {

        const record = context.record?.params || {}
        const options = this.uploadContext.resize

        const oldValue = record[key]
        if (oldValue) {
            const oldFiles = Array.isArray(oldValue) ? oldValue : [oldValue]
            await Promise.all(
                oldFiles.map(async oldKey => {
                    const cleaned = oldKey.startsWith('/') ? oldKey.slice(1) : oldKey
                    try {
                        await this.s3
                            .deleteObject({
                                Bucket: this.bucket,
                                Key: cleaned,
                            })
                            .promise()
                    } catch (e) {
                        console.warn('Ошибка при удалении старого файла из S3:', e)
                    }
                })
            )
        }

        const files = Array.isArray(file) ? file : [file]


        const uploadPromises = files.map(async f => {

            const optimizedFile = await this.optimizeImage(f, options)

            await this.s3
                .upload({
                    Bucket: this.bucket,
                    Key: record._uploadKey.startsWith('/')
                        ? record._uploadKey.slice(1)
                        : record._uploadKey,
                    Body: optimizedFile,
                    ContentType: 'image/webp',
                    ACL: 'public-read',
                })
                .promise()

            return record._uploadKey
        })

        const uploadResults = await Promise.all(uploadPromises)

        return uploadResults.length === 1 ? uploadResults[0] : uploadResults
    }

    async delete(key) {
        if (!key) return
        const keys = Array.isArray(key) ? key : [key]
        for (const k of keys) {
            const cleanKey = k.startsWith('/') ? k.slice(1) : k
            await this.s3
                .deleteObject({
                    Bucket: this.bucket,
                    Key: cleanKey,
                })
                .promise()
        }
    }

    path(key) {
        if (!key) return null
        if (Array.isArray(key)) {
            return key.map(k => `${this.baseUrl}/${k}`)
        }
        return `${this.baseUrl}${key}`
    }
}
