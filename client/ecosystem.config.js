module.exports = {
	apps: [
		{
			name: 'CLIENT',
			script: 'yarn',
			args: 'start',
			watch: true,
			ignore_watch: ['node_modules', '.next/cache'],
		},
	],
}
