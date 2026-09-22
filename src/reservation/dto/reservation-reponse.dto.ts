import { Reservation, Journey, Account } from 'zenstack/models';

export class ReservationResponseDto {
  journey: {
    startDate: string;
    endDate: string;
    startCity: string;
    endCity: string;
    totalPlaces: number;
  };
  reservedBy: {
    username: string;
    name: string | null;
  };
}

interface ReservationRow {
  journey: Journey;
  reservedBy: Account;
}

export const toReservationResponse = (
  model: Reservation,
): ReservationResponseDto => {
  const m = model as unknown as ReservationRow;
  return {
    journey: {
      startDate: m.journey.startDate.toISOString(),
      endDate: m.journey.endDate.toDateString(),
      startCity: m.journey.startCity,
      endCity: m.journey.endCity,
      totalPlaces: m.journey.totalPlaces,
    },
    reservedBy: {
      username: m.reservedBy.username,
      name: m.reservedBy.name ?? null,
    },
  };
};
