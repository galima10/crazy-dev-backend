import { IsString, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @MaxLength(255)
  username: string;

  @IsString()
  @MaxLength(255)
  name: string | null;

  @IsString()
  description: string | null;
}
