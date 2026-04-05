import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/decorators/auth.decorator'
import { PaginationInput } from '../pagination/input/pagination.input'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { CurrentItem } from './entities/current-item/current-item.entity'
import { ItemForEdit } from './entities/item-for-edit/item-for-edit.entity'
import { Items } from './entities/items/items.entity'
import { ProfileItems } from './entities/profile-items/profile-items.entity'
import { ItemsFiltersInput } from './inputs/filters/items-filters.input'
import { ItemUpsertInput } from './inputs/upsert/item-upsert.input'
import { ItemService } from './item.service'

@Resolver()
export class ItemResolver {
	constructor(private readonly itemService: ItemService) {}

	@Query(() => Items, { name: 'items' })
	async getItems(@Args('filters') filters: ItemsFiltersInput) {
		return this.itemService.getItems(filters)
	}

	@Query(() => CurrentItem, { name: 'currentItem' })
	async getCurrentItem(@Args('id', { type: () => Int }) id: number) {
		return this.itemService.getCurrentItem(id)
	}

	@Auth()
	@Query(() => ProfileItems, { name: 'profileItems' })
	async getProfileItems(
		@Args('pagination') pagination: PaginationInput,
		@CurrentUser('id') userId: number
	) {
		return this.itemService.getProfileItems(pagination, userId)
	}

	@Auth()
	@Query(() => ItemForEdit, { name: 'itemForEdit' })
	async getItemForEdit(
		@CurrentUser('id') userId: number,
		@Args('id', { type: () => Int, nullable: true }) itemId?: number
	) {
		return this.itemService.getItemForEdit(userId, itemId)
	}

	@Auth()
	@Mutation(() => Boolean, { name: 'promoteItem' })
	async promoteItem(
		@CurrentUser('id') userId: number,
		@Args('id', { type: () => Int }) itemId: number
	) {
		return this.itemService.promoteItem(userId, itemId)
	}

	@Auth()
	@Mutation(() => String, { name: 'upsertItem', nullable: true })
	async upsertItem(
		@CurrentUser('id') userId: number,
		@Args('data') input: ItemUpsertInput,
		@Args('id', { type: () => Int, nullable: true }) itemId?: number
	) {
		return this.itemService.upsertItem(input, userId, itemId)
	}

	@Auth()
	@Mutation(() => Boolean, { name: 'deleteItem' })
	async deleteItem(
		@CurrentUser('id') userId: number,
		@Args('id', { type: () => Int }) itemId: number
	) {
		return this.itemService.deleteItem(userId, itemId)
	}
}
