module.exports = {
	apps: [
		{
			name: 'admin',
			script: 'src/index.js',
			args: 'start',
			ignore_watch: ['node_modules'],
			env: {
				PORT: 5500,
				DATABASE_URL: 'postgresql://user:password@host/base?schema=public',
				STORAGE_URL: 'test',
				STORAGE_BUCKET: 'test',
				STORAGE_ID: 'test',
				STORAGE_TOKEN: 'test',
				CLOUD_URL: 'https://cloud.domain.com',
			},
		},
	],
}
