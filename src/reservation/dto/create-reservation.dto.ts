import { IsUUID } from 'class-validator';

export class CreateReservationDto {
  @IsUUID()
  journeyId: string;

  @IsUUID()
  accountId: string;
}
