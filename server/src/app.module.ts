import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AttributeModule } from './api/attribute/attribute.module'
import { AuthModule } from './api/auth/auth.module'
import { CategoryModule } from './api/category/category.module'
import { FilterModule } from './api/filter/filter.module'
import { ItemModule } from './api/item/item.module'
import { MetadataModule } from './api/metadata/metadata.module'
import { PageModule } from './api/page/page.module'
import { YookassaModule } from './api/payment/yookassa/yookassa.module'
import { PropertyModule } from './api/property/property.module'
import { RegionModule } from './api/region/region.module'
import { RequestModule } from './api/request/request.module'
import { ReviewModule } from './api/review/review.module'
import { SeoModule } from './api/seo/seo.module'
import { TelegramModule } from './api/telegram/telegram.module'
import { UserModule } from './api/user/user.module'
import { getGraphQLConfig } from './config/graphql.config'
import { GlobalModule } from './global.module'
import { FaqModule } from './api/faq/faq.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			useFactory: getGraphQLConfig,
		}),
		GlobalModule,
		AuthModule,
		UserModule,
		SeoModule,
		MetadataModule,
		CategoryModule,
		PageModule,
		FilterModule,
		RequestModule,
		ItemModule,
		ReviewModule,
		YookassaModule,
		AttributeModule,
		PropertyModule,
		RegionModule,
		TelegramModule,
		FaqModule,
	],
})
export class AppModule {}
