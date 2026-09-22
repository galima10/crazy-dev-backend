import { Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ZenStackService } from '@/zenstack/zenstack.service';
import { AccountResponseDto } from './dto/account-response.dto';
import { Account } from 'zenstack/models';
import { ReservationService } from '@/reservation/reservation.service';

@Injectable()
export class AccountService {
  constructor(
    private zen: ZenStackService,
    private readonly reservationService: ReservationService,
  ) {}

  private toResponse(account: Account): AccountResponseDto {
    return {
      username: account.username,
      name: account.name,
      description: account.description,
      createdAt: account.createdAt.toISOString(),
    };
  }

  async findAll() {
    const response = await this.zen.dbWithoutAuth().account.findMany();
    return response.map((response) => this.toResponse(response));
  }

  async findOne(id: string) {
    const response = await this.zen
      .dbWithoutAuth()
      .account.findFirstOrThrow({ where: { id } });
    return this.toResponse(response);
  }

  async findReservations(id: string) {
    await this.zen.dbWithoutAuth().account.findFirstOrThrow({ where: { id } });
    return this.reservationService.findAllByAccount(id);
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const response = await this.zen.dbWithoutAuth().account.update({
      where: { id },
      data: {
        name: updateAccountDto.name,
        description: updateAccountDto.description,
      },
    });
    return this.toResponse(response);
  }

  async remove(id: string) {
    return await this.zen.dbWithoutAuth().account.delete({ where: { id } });
  }
}
