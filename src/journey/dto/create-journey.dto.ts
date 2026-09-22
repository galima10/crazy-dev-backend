import { IsString, IsDateString, MaxLength, IsUUID, IsNumber } from 'class-validator';

export class CreateJourneyDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @MaxLength(255)
  startCity: string;

  @IsString()
  @MaxLength(255)
  endCity: string;

  @IsNumber()
  totalPlaces: number;

  @IsUUID()
  createdBy: string;
}
