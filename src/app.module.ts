import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JourneyModule } from './journey/journey.module';
import { AccountModule } from './account/account.module';
import { ReservationModule } from './reservation/reservation.module';
import { ZenStackModule } from './zenstack/zenstack.module';

@Module({
  imports: [ZenStackModule, JourneyModule, AccountModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
