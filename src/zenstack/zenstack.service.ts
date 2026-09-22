import { Injectable } from '@nestjs/common';

import { ZenStackClient } from '@zenstackhq/orm';
import { PolicyPlugin } from '@zenstackhq/plugin-policy';
import { schema } from 'zenstack/schema';

import { MysqlDialect } from '@zenstackhq/orm/dialects/mysql';
import { createPool } from 'mysql2/promise';

@Injectable()
export class ZenStackService {
  // Raw client — no policy enforcement, for internal/system operations
  readonly system = new ZenStackClient(schema, {
    dialect: new MysqlDialect({
      pool: createPool({
        uri: process.env.DATABASE_URL,
      }),
    }),
  });

  // Default policy-scoped client.
  // Raw SQL is rejected so an accidental $queryRaw cannot silently bypass policy.
  private base = this.system.$use(new PolicyPlugin());

  // Opt-in variant that additionally permits raw SQL.
  // Policy still enforces all model CRUD.
  private rawAllowed = this.system.$use(
    new PolicyPlugin({
      dangerouslyAllowRawSql: true,
    }),
  );

  db(user?: AuthContext) {
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