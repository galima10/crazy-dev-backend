import { Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ZenStackService } from '@/zenstack/zenstack.service';
import { AccountResponseDto } from './dto/account-response.dto';
import { Account } from 'zenstack/models';

@Injectable()
export class AccountService {
  constructor(private zen: ZenStackService) {}

  private toResponse(account: Account): AccountResponseDto {
    return {
      username: account.username,
      name: account.name,
      description: account.description,
      createdAt: account.createdAt.toISOString(),
    };
  }

  async findOne(id: string) {
    const response = await this.zen
      .db()
      .account.findFirstOrThrow({ where: { id } });
    return this.toResponse(response);
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const response = await this.zen.db().account.update({
      where: { id },
      data: {
        name: updateAccountDto.name,
        description: updateAccountDto.description,
      },
    });
    return this.toResponse(response);
  }

  async remove(id: string) {
    return await this.zen.db().account.delete({ where: { id } });
  }
}
