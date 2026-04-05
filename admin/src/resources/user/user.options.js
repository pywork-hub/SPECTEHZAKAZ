import passwordsFeature from '@adminjs/passwords'
import uploadFeature from '@adminjs/upload'
import { hash } from 'argon2'
import dotenv from 'dotenv'
import { v4 as uuid } from 'uuid'
import { UploadProvider } from '../../providers/upload.provider.js'
import { emailValidation } from '../../validations/email/email.validation.js'
import { phoneValidation } from '../../validations/phone/phone.validation.js'
import {RoleTranslate} from "../../utils/translate/translate-enum.util.js";
import {getDate} from "../../utils/helpers/date/get-date.util.js";

dotenv.config()

export const userOptions = componentLoader => ({
	options: {
		navigation: { name: 'Пользователи', icon: 'User' },
		label: 'Пользователи',
		properties: {
			id: { label: 'Номер' },
			name: { label: 'Имя' },
			email: {
				label: 'E-mail',
				props: { placeholder: 'example@mail.com' },
			},
			phone: {
				label: 'Телефон',
				isRequired: true,
				type: 'string',
				components: {
					edit: componentLoader.PhoneInput,
					list: null,
					show: null,
				},
				props: {
					placeholder: '+7 (XXX) XXX-XX-XX',
				},
			},
			role: { label: 'Роль', availableValues: RoleTranslate },

			// 👉 нужно добавить виртуальное поле
			avatarFile: {
				isVisible: { list: false, filter: false, show: false, edit: true },
			},

			avatarPath: { label: 'Аватар' },

			newPassword: {
				label: 'Пароль',
				type: 'password',
				isVisible: {
					list: false,
					edit: true,
					show: false,
					filter: false
				}
			},
			createdAt: { label: 'Дата регистрации' },
		},
		listProperties: ['id', 'name', 'email', 'phone', 'createdAt', 'role'],
		editProperties: [
			'name',
			'email',
			'phone',
			'newPassword',
			'avatarFile',
			'role',
		],
		showProperties: [
			'id',
			'name',
			'email',
			'phone',
			'avatarPath',
			'createdAt',
			'role',
		],
		filterProperties: ['id', 'name', 'email', 'phone', 'createdAt', 'role'],
		actions: {
			new: {
				before: async request => {
					emailValidation(request.payload?.email)
					phoneValidation(request.payload?.phone)

					if (request.payload.newPassword) {
						request.payload.password = await hash(request.payload.newPassword);
					}

					return request
				},
			},
			edit: {
				before: async request => {
					emailValidation(request.payload?.email)
					phoneValidation(request.payload?.phone)

					const isRemoveTriggered =
						request.payload?.avatarFile === '__FORM_VALUE_NULL__'

					const hasNewFile =
						!!request.payload?.avatarFile &&
						request.payload?.avatarFile !== '__FORM_VALUE_NULL__'

					if (
						isRemoveTriggered ||
						(hasNewFile && !request.payload.avatarPath)
					) {
						request.payload.avatarPath = '/storage/images/base/avatar.webp'
					}

					if (request.payload.newPassword && request.payload.newPassword !== '********') {
						request.payload.password = await hash(request.payload.newPassword);

					} else {
						delete request.payload.newPassword;
					}

					return request
				},
			},
		},
	},
	features: [
		passwordsFeature({
			componentLoader,
			properties: {
				encryptedPassword: 'password',
				password: 'newPassword',
			},
			hash,
		}),
		uploadFeature({
			componentLoader,
			provider: new UploadProvider({
				folder: 'users/avatars',
				slug: 'avatar',
				resize: {
					width: 150,
					height: 150,
					fit: 'cover',
					position: 'centre',
				},
			}),
			properties: {
				file: 'avatarFile',
				key: 'avatarPath',
			},
			validation: {
				mimeTypes: ['image/webp'],
			},
			uploadPath: record => {
				const key = `/storage/images/users/avatars/avatar-${uuid()}-${getDate()}.webp`

				record.params._uploadKey = key

				return key
			},
		}),
	],
})
