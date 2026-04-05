import { Resolver } from '@nestjs/graphql';
import { RegionService } from './region.service';

@Resolver()
export class RegionResolver {
  constructor(private readonly regionService: RegionService) {}
}
