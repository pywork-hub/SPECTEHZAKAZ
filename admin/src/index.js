import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'
import AdminJS, { ComponentLoader } from 'adminjs'
import dotenv from 'dotenv'
import express from 'express'
import { getResources } from './resources/resources.js'
dotenv.config()

const prisma = new PrismaClient()

AdminJS.registerAdapter({ Database, Resource })

const componentLoader = new ComponentLoader()

export const Components = {
	PhoneInput: componentLoader.add('PhoneInput', './components/phone-mask.component'),
	CustomEditSettings: componentLoader.add('CustomEditSettings', './components/custom-edit-settings.component'),
}

const admin = new AdminJS({
	rootPath: '/admin',
	componentLoader,
	locale: {
		language: 'ru',
		availableLanguages: ['ru'],
	},
	resources: getResources(prisma, componentLoader),
})

const app = express()

const adminRouter = AdminJSExpress.buildRouter(admin)

admin.watch()

app.use(admin.options.rootPath, adminRouter)

app.listen(process.env.PORT, () => {
	console.log('AdminJS is under http://localhost:5500/admin')
})
