import { getYandexMetrikaSnippet } from '@/snippets/yandex-metrika/get-yandex-metrika.snippet'
import Script from 'next/script'
import type { FC } from 'react'

const Scripts: FC = () => {
	return (
		<>
			<Script
				src="https://cdn.direct.i-dgtl.ru/VerifyWidget.umd.min.js"
				strategy="afterInteractive"
			/>
			<Script
				id="yandex-metrika"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: getYandexMetrikaSnippet(),
				}}
			/>
			<noscript>
				<div>
					<img
						src="https://mc.yandex.ru/watch/103109546"
						style={{ position: 'absolute', left: '-9999px' }}
						alt=""
					/>
				</div>
			</noscript>
		</>
	)
}

export default Scripts
