import { IsString, MaxLength } from 'class-validator';

export class UpdateAccountDto {
  @IsString()
  @MaxLength(255)
  name: string | null;

  @IsString()
  description: string | null;
}
