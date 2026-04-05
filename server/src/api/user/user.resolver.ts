import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser as Me } from './decorator/current-user.decorator'
import { CurrentUser } from './entities/current-user/current-user.entity'
import { ProfileEdit } from './entities/profile-edit/profile-edit.entity'
import { Profile } from './entities/profile/profile.entity'
import { UpdatePasswordInput } from './input/update-password/update-password.input'
import { ProfileUpdateInput } from './input/update/profile-update.input'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Query(() => CurrentUser, { name: 'currentUser' })
	async getCurrentUser(@Me() user: CurrentUser) {
		return user
	}

	@Auth()
	@Query(() => Profile, { name: 'profile' })
	async getProfile(@Me('id') id: number) {
		return this.userService.getProfile(id)
	}

	@Auth()
	@Query(() => ProfileEdit, { name: 'profileForEdit' })
	async getProfileForEdit(@Me('id') id: number) {
		return this.userService.getProfileForEdit(id)
	}

	@Auth()
	@Mutation(() => Boolean, { name: 'updateProfile' })
	async updateProfile(
		@Me('id') userId: number,
		@Args('data') input: ProfileUpdateInput
	) {
		return this.userService.updateProfile(input, userId)
	}

	@Mutation(() => Boolean, { name: 'updatePassword' })
	async updatePassword(@Args('data') input: UpdatePasswordInput) {
		return this.userService.updatePassword(input)
	}
}
