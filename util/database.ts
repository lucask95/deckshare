import pgPromise from "pg-promise";

const pgp = pgPromise();

// generic singleton creator:
function createSingleton<T>(name: string, create: () => T): T {
  const s = Symbol.for(name);
  let scope = (global as any)[s];
  if (!scope) {
    scope = { ...create() };
    (global as any)[s] = scope;
  }
  return scope;
}

interface IDatabaseScope {
  db: pgPromise.IDatabase<any>;
  pgp: pgPromise.IMain;
}

export function getDB(): IDatabaseScope {
  return createSingleton<IDatabaseScope>("deckbuild-db", () => {
    return {
      db: pgp({
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT ?? "5432", 10),
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
      }),
      pgp,
    };
  });
}
