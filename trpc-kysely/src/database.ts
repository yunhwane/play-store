import { Pool } from 'pg'
import { CompiledQuery, Kysely, PostgresDialect } from 'kysely'
import { Database } from './types';


const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'test',
    host: 'localhost',
    user: 'admin',
    port: 5432,
    max: 10,
  })
});

interface LogEvent {
  level: 'query' | 'error';
  query: CompiledQuery;
  queryDurationMillis: number;
  error: unknown;
}

export const db = new Kysely<Database>({
  dialect,

  log(event) {
    if (event.level === "error") {
        console.error("Query failed : ", {
          durationMs: event.queryDurationMillis,
          error: event.error,
          sql: event.query.sql,
          params: event.query.parameters.map(maskPII),
        });
    } else { 
      console.log("Query executed : ", {
        durationMs: event.queryDurationMillis,
        sql: event.query.sql,
        params: event.query.parameters.map(maskPII),
      });
    }
  }
});

function maskPII(value: unknown, index: number, array: readonly unknown[]): unknown {
  throw new Error('Function not implemented.');
}

