import auth from 'basic-auth'
import dotenv from 'dotenv'
dotenv.config()

export const adminAuth = (req, res, next) => {
	const credentials = auth(req)

	if (!credentials) {
		res.statusCode = 401
		res.setHeader('WWW-Authenticate', 'Basic realm="Admin Panel"')
		res.end('Access denied')
		return
	}

	const { name, pass } = credentials

	if (
		name === process.env.ADMIN_USERNAME &&
		pass === process.env.ADMIN_PASSWORD
	) {
		next()
	} else {
		res.statusCode = 401
		res.setHeader('WWW-Authenticate', 'Basic realm="Admin Panel"')
		res.end('Access denied')
		return
	}
}
