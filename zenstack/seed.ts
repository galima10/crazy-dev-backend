import { ZenStackClient } from '@zenstackhq/orm';
import { MysqlDialect } from '@zenstackhq/orm/dialects/mysql';
import { createPool } from 'mysql2';
import { hash } from 'bcrypt';

import { schema } from './schema';

import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

const pool = createPool({
  uri: databaseUrl,
  timezone: 'Z',
});

// No PolicyPlugin — seed bypasses access-control checks
const db = new ZenStackClient(schema, {
  dialect: new MysqlDialect({
    pool,
  }),
});

/** Fixed ids so the seed stays idempotent and fixtures are addressable in tests. */
const ACCOUNT_IDS = {
  alice: '11111111-1111-4111-8111-111111111111',
  bob: '22222222-2222-4222-8222-222222222222',
  chloe: '33333333-3333-4333-8333-333333333333',
  david: '44444444-4444-4444-8444-444444444444',
} as const;

const JOURNEY_IDS = {
  genevaZurich: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  lausanneBern: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  bernBasel: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  zurichMilan: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
  sionGeneva: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
} as const;

const SEEDED_ACCOUNT_IDS = Object.values(ACCOUNT_IDS);
const SEEDED_JOURNEY_IDS = Object.values(JOURNEY_IDS);

/** Truncated to the second: the columns are DATETIME(0). */
function at(daysFromNow: number, hour: number, minute = 0): Date {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysFromNow);
  date.setUTCHours(hour, minute, 0, 0);
  return date;
}

async function accountFixtures() {
  const password = await hash('password123', 10);

  return [
    {
      id: ACCOUNT_IDS.alice,
      username: 'alice',
      name: 'Alice Dupont',
      password,
      description: 'Commute Genève ↔ Zurich toutes les semaines.',
    },
    {
      id: ACCOUNT_IDS.bob,
      username: 'bob',
      name: 'Bob Martin',
      password,
      description: 'Conduit une Skoda break, place pour les vélos.',
    },
    {
      id: ACCOUNT_IDS.chloe,
      username: 'chloe',
      name: 'Chloé Favre',
      password,
      description: null,
    },
    {
      id: ACCOUNT_IDS.david,
      username: 'david',
      name: null,
      password,
      description: 'Nouveau sur la plateforme.',
    },
  ];
}

const journeyFixtures = [
  {
    id: JOURNEY_IDS.genevaZurich,
    startDate: at(3, 7, 30),
    endDate: at(3, 10, 45),
    startCity: 'Genève',
    endCity: 'Zurich',
    totalPlaces: 3,
    createdById: ACCOUNT_IDS.alice,
  },
  {
    id: JOURNEY_IDS.lausanneBern,
    startDate: at(5, 17, 0),
    endDate: at(5, 18, 30),
    startCity: 'Lausanne',
    endCity: 'Berne',
    totalPlaces: 2,
    createdById: ACCOUNT_IDS.bob,
  },
  {
    id: JOURNEY_IDS.bernBasel,
    startDate: at(7, 9, 0),
    endDate: at(7, 10, 15),
    startCity: 'Berne',
    endCity: 'Bâle',
    totalPlaces: 4,
    createdById: ACCOUNT_IDS.bob,
  },
  {
    // Full journey: both places are taken by the reservation fixtures.
    id: JOURNEY_IDS.zurichMilan,
    startDate: at(14, 6, 15),
    endDate: at(14, 12, 0),
    startCity: 'Zurich',
    endCity: 'Milan',
    totalPlaces: 2,
    createdById: ACCOUNT_IDS.chloe,
  },
  {
    // Past journey, useful to test filtering on upcoming trips.
    id: JOURNEY_IDS.sionGeneva,
    startDate: at(-10, 8, 0),
    endDate: at(-10, 10, 30),
    startCity: 'Sion',
    endCity: 'Genève',
    totalPlaces: 3,
    createdById: ACCOUNT_IDS.alice,
  },
];

const reservationFixtures = [
  { journeyId: JOURNEY_IDS.genevaZurich, reservedById: ACCOUNT_IDS.bob },
  { journeyId: JOURNEY_IDS.genevaZurich, reservedById: ACCOUNT_IDS.chloe },
  { journeyId: JOURNEY_IDS.lausanneBern, reservedById: ACCOUNT_IDS.david },
  // Journey complet
  { journeyId: JOURNEY_IDS.zurichMilan, reservedById: ACCOUNT_IDS.alice },
  { journeyId: JOURNEY_IDS.zurichMilan, reservedById: ACCOUNT_IDS.david },
  // Trajet passé
  { journeyId: JOURNEY_IDS.sionGeneva, reservedById: ACCOUNT_IDS.chloe },
];

/**
 * Removes only what this seed created, children first, so it can be re-run
 * without wiping rows that came from somewhere else.
 */
async function clearSeededData() {
  await db.reservation.deleteMany({
    where: { journeyId: { in: SEEDED_JOURNEY_IDS } },
  });
  await db.journey.deleteMany({ where: { id: { in: SEEDED_JOURNEY_IDS } } });
  await db.account.deleteMany({ where: { id: { in: SEEDED_ACCOUNT_IDS } } });
}

async function main() {
  await clearSeededData();

  const accounts = await accountFixtures();
  await db.account.createMany({ data: accounts });
  await db.journey.createMany({ data: journeyFixtures });
  await db.reservation.createMany({ data: reservationFixtures });

  console.log(
    `Seeded ${accounts.length} accounts, ${journeyFixtures.length} journeys, ${reservationFixtures.length} reservations.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    // Closes the underlying mysql2 pool too.
    await db.$disconnect();
  });
