import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeResolver } from './attribute.resolver';

@Module({
  providers: [AttributeResolver, AttributeService],
})
export class AttributeModule {}
