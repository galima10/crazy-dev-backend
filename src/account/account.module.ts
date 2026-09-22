import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { ReservationModule } from '@/reservation/reservation.module';

@Module({
  imports: [ReservationModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
