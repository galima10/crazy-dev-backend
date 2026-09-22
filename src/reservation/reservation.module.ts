import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ZenStackService } from '@/zenstack/zenstack.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, ZenStackService],
})
export class ReservationModule {}
