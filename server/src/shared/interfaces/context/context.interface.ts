import type { Request, Response } from 'express'
import type { CurrentUser } from 'src/api/user/entities/current-user/current-user.entity'

export interface IContext {
	res: Response
	req: Request & {
		user: CurrentUser
	}
}

export interface IRequest extends Request {
	user: CurrentUser
}
