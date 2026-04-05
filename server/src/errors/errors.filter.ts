import { Catch } from '@nestjs/common'
import type { GqlExceptionFilter } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { GLOBAL_ERROR } from './global/global.error'

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
	catch(exception: any) {
		const error = exception?.response?.message || GLOBAL_ERROR
		const code = exception?.response?.statusCode || 400

		return new GraphQLError(error, {
			extensions: {
				code,
			},
		})
	}
}
