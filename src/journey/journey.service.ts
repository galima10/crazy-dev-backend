import { Injectable } from '@nestjs/common';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { ZenStackService } from '@/zenstack/zenstack.service';
import { Journey } from 'zenstack/models';
import { JourneyResponseDto } from './dto/journey-response.dto';

type JourneyWithCreatedBy = Journey & {
  createdBy: {
    username: string;
    name: string | null;
  };
};

@Injectable()
export class JourneyService {
  constructor(private zen: ZenStackService) {}

  private toResponse(journey: JourneyWithCreatedBy): JourneyResponseDto {
    return {
      startDate: journey.startDate.toISOString(),
      endDate: journey.endDate.toISOString(),
      startCity: journey.startCity,
      endCity: journey.endCity,
      totalPlaces: journey.totalPlaces,
      createdAt: journey.createdAt.toISOString(),
      createdBy: {
        username: journey.createdBy.username,
        name: journey.createdBy.name,
      },
    };
  }
  async create(createJourneyDto: CreateJourneyDto) {
    const response = await this.zen.dbWithoutAuth().journey.create({
      data: {
        createdById: createJourneyDto.createdById,
        startDate: new Date(createJourneyDto.startDate),
        endDate: new Date(createJourneyDto.endDate),
        startCity: createJourneyDto.startCity,
        endCity: createJourneyDto.endCity,
        totalPlaces: createJourneyDto.totalPlaces,
      },
      select: {
        id: true,
        createdAt: true,
        startDate: true,
        endDate: true,
        startCity: true,
        endCity: true,
        totalPlaces: true,
        createdById: true,
        createdBy: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });

    return this.toResponse(response);
  }

  async findAll() {
    const response = await this.zen.dbWithoutAuth().journey.findMany({
      select: {
        id: true,
        createdById: true,
        startDate: true,
        endDate: true,
        startCity: true,
        endCity: true,
        totalPlaces: true,
        createdAt: true,
        createdBy: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });
    return response.map((journey) => this.toResponse(journey));
  }

  async findOne(id: string) {
    const response = await this.zen.dbWithoutAuth().journey.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        createdById: true,
        startDate: true,
        endDate: true,
        startCity: true,
        endCity: true,
        totalPlaces: true,
        createdAt: true,
        createdBy: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });
    return this.toResponse(response);
  }

  async remove(id: string) {
    return this.zen.dbWithoutAuth().journey.delete({ where: { id } });
  }
}
