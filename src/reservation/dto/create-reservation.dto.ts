import { IsUUID } from 'class-validator';

export class CreateReservationDto {
  @IsUUID()
  journeyId: string;

  @IsUUID()
  reservedById: string;
}
