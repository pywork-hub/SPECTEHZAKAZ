import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/decorators/auth.decorator'
import { PaginationInput } from '../pagination/input/pagination.input'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { ProfileRequests } from './entities/profile-requests/profile-requests.entity'
import { RequestForEdit } from './entities/request-for-edit/request-for-edit.entity'
import { Requests } from './entities/requests/requests.entity'
import { RequestsFiltersInput } from './inputs/filters/requests-filters.input'
import { RequestUpsertInput } from './inputs/upsert/request-upsert.input'
import { RequestService } from './request.service'

@Resolver()
export class RequestResolver {
	constructor(private readonly requestService: RequestService) {}

	@Query(() => Requests, { name: 'requests' })
	async getRequests(@Args('filters') filters: RequestsFiltersInput) {
		return this.requestService.getRequests(filters)
	}

	@Auth()
	@Query(() => ProfileRequests, { name: 'profileRequests' })
	async getProfileRequests(
		@CurrentUser('id') userId: number,
		@Args('pagination') pagination: PaginationInput
	) {
		return this.requestService.getProfileRequests(pagination, userId)
	}

	@Auth()
	@Query(() => RequestForEdit, { name: 'requestForEdit' })
	async getRequestForEdit(
		@CurrentUser('id') userId: number,
		@Args('id', { type: () => Int, nullable: true }) requestId?: number
	) {
		return this.requestService.getRequestForEdit(userId, requestId)
	}

	@Auth()
	@Mutation(() => Boolean, { name: 'promoteRequest' })
	async promoteRequest(
		@CurrentUser('id') userId: number,
		@Args('id', { type: () => Int }) requestId: number
	) {
		return this.requestService.promoteRequest(userId, requestId)
	}

	@Auth()
	@Mutation(() => Boolean, { name: 'upsertRequest' })
	async upsertRequest(
		@CurrentUser('id') userId: number,
		@Args('data') input: RequestUpsertInput,
		@Args('id', { type: () => Int, nullable: true }) requestId?: number
	) {
		return this.requestService.upsertRequest(input, userId, requestId)
	}

	@Auth()
	@Mutation(() => Boolean, { name: 'deleteRequest' })
	async deleteRequest(
		@CurrentUser('id') userId: number,
		@Args('id', { type: () => Int }) requestId: number
	) {
		return this.requestService.deleteRequest(userId, requestId)
	}
}
