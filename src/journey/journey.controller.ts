import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { CreateJourneyDto } from './dto/create-journey.dto';

@Controller('journeys')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}

  @Post()
  create(@Body() createJourneyDto: CreateJourneyDto) {
    return this.journeyService.create(createJourneyDto);
  }

  @Get()
  findAll() {
    return this.journeyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journeyService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journeyService.remove(id);
  }
}
