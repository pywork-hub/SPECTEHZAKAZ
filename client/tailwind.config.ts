import type { Config } from 'tailwindcss'

const plugin = require('tailwindcss/plugin')

export default {
	content: ['./src/components/**/*.tsx', './src/app/**/*.tsx'],
	theme: {
		fontFamily: {
			alumni: ['var(--font-alumni), sans-serif'],
			montserrat: ['var(--font-montserrat), sans-serif'],
		},
		fontSize: {
			sm: '8px',
			'2sm': '10px',
			'3sm': '11px',
			'4sm': '12px',
			'5sm': '13px',
			md: '14px',
			'2md': '15px',
			base: '16px',
			lg: '18px',
			'2lg': '20px',
			'3lg': '21px',
			'4lg': '40px',
			'5lg': '48px',
			xl: '96px',
		},
		colors: {
			transparent: 'transparent',
			black: '#000000',
			white: '#ffffff',
		},
		zIndex: {
			0: '0',
			1: '1',
			2: '2',
			10: '10',
		},
		lineHeight: {
			none: '1',
			base: '1.2',
			md: '1.5',
			lg: '1.8',
		},
		keyframes: {
			fade: {
				from: { opacity: '0' },
				to: { opacity: '1' },
			},
			spin: {
				from: { transform: 'rotate(0deg)' },
				to: { transform: 'rotate(-1turn)' },
			},
			loading: {
				'0%': { width: '30px' },
				'80%': { width: '100%' },
				'100%': { width: '100%' },
			},
		},
		animation: {
			fade: 'fade 300ms ease-in-out forwards',
			spin: 'spin 1.1s linear infinite',
			loading: 'loading 4s ease-out forwards',
		},
		extend: {
			transitionTimingFunction: {
				DEFAULT: 'ease-out',
			},
			transitionDuration: {
				DEFAULT: '250ms',
			},
		},
	},
	plugins: [
		plugin(
			({
				addComponents,
				theme,
				addUtilities,
			}: {
				addUtilities: Function
				addComponents: Function
				theme: Function
			}) => {
				addComponents({
					'.btn-orange': {
						backgroundColor: '#FFA202',
						color: '#fff',
						transition: 'background-color 300ms ease-out',

						'&:hover': {
							backgroundColor: '#ff8f00',
						},
					},

					'.btn-orange-gradient': {
						background:
							'linear-gradient(90deg, rgba(255,162,2,1) 0%, rgba(228,181,99,1) 100%)',
						color: '#fff',
						transition: 'filter 250ms ease-out',

						'&:hover': {
							filter: 'brightness(1.05)',
						},
					},

					'.btn-gray-gradient': {
						background:
							'linear-gradient(90deg, rgba(48,58,70,1) 0%, rgba(100,112,125,1) 100%)',
						color: '#fff',
						transition: 'filter 250ms ease-out',

						'&:hover': {
							filter: 'brightness(1.10)',
						},
					},
				})

				addUtilities({
					'.scrollbar-y': {
						overflowX: 'hidden',
						overflowY: 'auto',
						scrollbarColor: '#ffa202 #f4f5f5',
						scrollbarWidth: 'thin',

						'&::-webkit-scrollbar': {
							'-webkit-appearance': 'none',
							width: '5px',
							borderRadius: '50%',
						},

						'&::-webkit-scrollbar-track': {
							width: '100%',
							backgroundColor: '#f4f5f5',
							borderRadius: '50%',
						},

						'&::-webkit-scrollbar-thumb': {
							width: '100%',
							backgroundColor: '#ffa202',
							borderRadius: '50%',
						},
					},

					'.image-like-bg-cover': {
						width: '100%',
						height: '100%',
						objectPosition: 'center',
						objectFit: 'cover',
						pointerEvents: 'none',
					},

					'.text-ellipsis': {
						maxWidth: '100%',
						display: 'block',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					},

					'.underline-hover': {
						position: 'relative',

						'&::before': {
							width: '0',
							height: '1px',
							position: 'absolute',
							left: '0',
							bottom: '-2px',
							transition: 'width 250ms ease-out',
						},

						'&:hover::before': {
							width: '100%',
						},
					},

					'.gray-gradient': {
						background:
							'linear-gradient(90deg, rgba(48,58,70,1) 0%, rgba(100,112,125,1) 100%)',
					},

					'.orange-gradient': {
						background:
							'linear-gradient(90deg, rgba(255,162,2,1) 0%, rgba(228,181,99,1) 100%)',
					},

					'.light-gradient': {
						background:
							'linear-gradient(90deg, rgba(232, 232, 234, 1) 0%, rgba(237, 238, 240, 0.6970120811996674) 100%)',
					},
				})
			}
		),
	],
} satisfies Config
