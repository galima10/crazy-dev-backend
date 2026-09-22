import { Account, Journey } from 'zenstack/models';

export class JourneyResponseDto {
  startDate: string;
  endDate: string;
  startCity: string;
  endCity: string;
  totalPlaces: number;
  createdAt: string;
  createdBy: {
    username: string;
    name: string | null;
  };
}
interface JourneyRow {
  id: string;
  startDate: Date;
  endDate: Date;
  startCity: string;
  endCity: string;
  totalPlaces: number;
  createdAt: Date;
  createdBy: Account;
}

export const toJourneyResponse = (model: Journey): JourneyResponseDto => {
  const m = model as unknown as JourneyRow;
  return {
    startDate: m.startDate.toISOString(),
    endDate: m.endDate.toISOString(),
    startCity: m.startCity,
    endCity: m.endCity,
    totalPlaces: m.totalPlaces,
    createdAt: m.createdAt.toDateString(),
    createdBy: {
      username: m.createdBy.username,
      name: m.createdBy.name ?? null,
    },
  };
};
