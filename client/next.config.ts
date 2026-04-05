import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	env: {
		ENV: process.env.APP_ENV,
		SERVER_URL: process.env.NEST_APP_URL,
		CLIENT_URL: process.env.NEXT_APP_URL,
		GRAPHQL_URL: process.env.GRAPHQL_URL,
		YANDEX_TOKEN: process.env.YANDEX_TOKEN,
		CLOUD_URL: process.env.CLOUD_URL,
		STORAGE_URL: process.env.STORAGE_URL,
		STORAGE_BUCKET: process.env.STORAGE_BUCKET,
		STORAGE_ID: process.env.STORAGE_ID,
		STORAGE_TOKEN: process.env.STORAGE_TOKEN,
		WIDGET_ID: process.env.WIDGET_ID,
		CAPTCHA_TOKEN: process.env.CAPTCHA_TOKEN,
	},
	async rewrites() {
		return [
			{
				source: '/storage/images/:path*',
				destination: `${process.env.CLOUD_URL}/storage/images/:path*`,
			},
		]
	},
}

export default nextConfig
