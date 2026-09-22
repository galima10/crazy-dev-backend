import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ZenStackService } from '@/zenstack/zenstack.service';
import { Reservation } from 'zenstack/models';
import { ReservationResponseDto } from './dto/reservation-reponse.dto';

type ReservationWithReservedByJourney = Reservation & {
  reservedBy: {
    username: string;
    name: string | null;
  };
  journey: {
    startDate: Date;
    endDate: Date;
    startCity: string;
    endCity: string;
    totalPlaces: number;
  };
};

@Injectable()
export class ReservationService {
  constructor(private zen: ZenStackService) {}

  private toResponse(
    reservation: ReservationWithReservedByJourney,
  ): ReservationResponseDto {
    return {
      journey: {
        startDate: reservation.journey.startDate.toISOString(),
        endDate: reservation.journey.endDate.toISOString(),
        startCity: reservation.journey.startCity,
        endCity: reservation.journey.endCity,
        totalPlaces: reservation.journey.totalPlaces,
      },
      reservedBy: {
        username: reservation.reservedBy.username,
        name: reservation.reservedBy.name,
      },
    };
  }
  async create(createReservationDto: CreateReservationDto) {
    const response = await this.zen.db().reservation.create({
      data: {
        journeyId: createReservationDto.journeyId,
        reservedById: createReservationDto.reservedById,
      },
      select: {
        id: true,
        createdAt: true,
        journeyId: true,
        journey: {
          select: {
            startDate: true,
            endDate: true,
            startCity: true,
            endCity: true,
            totalPlaces: true,
          },
        },
        reservedById: true,
        reservedBy: {
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
    const response = await this.zen.db().reservation.findMany({
      select: {
        id: true,
        createdAt: true,
        journeyId: true,
        journey: {
          select: {
            startDate: true,
            endDate: true,
            startCity: true,
            endCity: true,
            totalPlaces: true,
          },
        },
        reservedById: true,
        reservedBy: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });
    return response.map((reservation) => this.toResponse(reservation));
  }

  async findOne(id: string) {
    const response = await this.zen.db().reservation.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        journeyId: true,
        journey: {
          select: {
            startDate: true,
            endDate: true,
            startCity: true,
            endCity: true,
            totalPlaces: true,
          },
        },
        reservedById: true,
        reservedBy: {
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
    return this.zen.db().reservation.delete({ where: { id } });
  }
}
