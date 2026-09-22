import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';

import { ZenStackClient } from '@zenstackhq/orm';
import { PolicyPlugin } from '@zenstackhq/plugin-policy';
import { schema } from 'zenstack/schema';

import { MysqlDialect } from '@zenstackhq/orm/dialects/mysql';
// Callback API on purpose — see createMysqlPool() below.
import { createPool } from 'mysql2';

const logger = new Logger('ZenStackService');

function createMysqlPool() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Make sure .env is loaded before the app boots.',
    );
  }
  const pool = createPool({ uri: url, timezone: 'Z' });
  pool.on('error', (err) => logger.error('MySQL pool error', err));

  return pool;
}

@Injectable()
export class ZenStackService implements OnModuleDestroy {
  private readonly pool = createMysqlPool();

  readonly system = new ZenStackClient(schema, {
    dialect: new MysqlDialect({ pool: this.pool }),
  });

  private base = this.system.$use(new PolicyPlugin());

  private rawAllowed = this.system.$use(
    new PolicyPlugin({
      dangerouslyAllowRawSql: true,
    }),
  );

  async onModuleDestroy() {
    await new Promise<void>((resolve) => this.pool.end(() => resolve()));
  }

  dbWithoutAuth() {
    return this.system;
  }

  db(user: AuthContext) {
    return this.base.$setAuth(user as never);
  }

  /**
   * Policy-scoped client that also permits raw SQL ($queryRaw / $executeRaw).
   *
   * Prefer db(user); use this only when raw SQL is genuinely required,
   * e.g. for an atomic INSERT ... ON DUPLICATE KEY UPDATE.
   */
  dbWithRawSql(user: AuthContext) {
    return this.rawAllowed.$setAuth(user as never);
  }
}

/**
 * The authenticated context set on `auth()` for policy evaluation.
 *
 * `id` is always present; account fields are populated once an account
 * is selected.
 */
export interface AuthContext {
  id: string;
  username?: string;
}
