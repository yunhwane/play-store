import { registerAs } from '@nestjs/config';

export const tursoConfig = registerAs('turso', () => ({
  databaseUrl: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
}));

export const TURSO_CONFIG_KEY = tursoConfig.KEY;
