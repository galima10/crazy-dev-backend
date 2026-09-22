import { Account } from 'zenstack/models';

export class AccountResponseDto {
  username: string;
  name: string | null;
  description: string | null;
  createdAt: string;
}

interface AccountRow {
  username: string;
  name: string | null;
  description: string | null;
  createdAt: Date;
}

export const toAccountResponse = (model: Account): AccountResponseDto => {
  const m = model as unknown as AccountRow;
  return {
    username: m.username,
    name: m.name ?? null,
    description: m.description ?? null,
    createdAt: m.createdAt.toISOString(),
  };
};
