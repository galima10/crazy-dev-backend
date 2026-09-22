import { Global, Module } from '@nestjs/common';
import { ZenStackService } from './zenstack.service';

/**
 * Global so every feature module shares a single ZenStackService — and
 * therefore a single MySQL connection pool. Listing the provider in each
 * feature module instead would give each of them its own pool.
 */
@Global()
@Module({
  providers: [ZenStackService],
  exports: [ZenStackService],
})
export class ZenStackModule {}
