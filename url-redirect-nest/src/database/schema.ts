import { urls } from './url.entity';
import { users } from './user.entity';
export const schema = {
  urls,
  users,
};
export type Schema = typeof schema;
