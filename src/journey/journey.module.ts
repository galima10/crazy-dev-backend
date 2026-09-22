import { Module } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { JourneyController } from './journey.controller';
import { ZenStackService } from '@/zenstack/zenstack.service';

@Module({
  controllers: [JourneyController],
  providers: [JourneyService, ZenStackService],
})
export class JourneyModule {}
