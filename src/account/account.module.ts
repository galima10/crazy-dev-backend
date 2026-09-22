import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { ZenStackService } from '@/zenstack/zenstack.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, ZenStackService],
})
export class AccountModule {}
