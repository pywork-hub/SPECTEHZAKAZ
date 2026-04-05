import { NextRequest, NextResponse } from 'next/server'
import { PUBLIC_ROUTE } from './constants/route/route.constants'
import { Cookie } from './shared/enums/cookie/cookie.enum'

export async function middleware(request: NextRequest, response: NextResponse) {
	const refreshToken = request.cookies.get(Cookie.REFRESH_TOKEN)?.value

	if (!refreshToken) {
		return redirectToHome(request)
	}
}

export const config = {
	matcher: '/profile',
}

const redirectToHome = (request: NextRequest) => {
	return NextResponse.redirect(new URL(PUBLIC_ROUTE.HOME, request.url))
}
