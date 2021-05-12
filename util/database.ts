import pgPromise from "pg-promise";

const pgp = pgPromise();
const db = pgp({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT ?? "5432", 10),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

export { pgp, db };
