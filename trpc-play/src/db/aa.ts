import { usersTable } from "./user.schema";
import { db } from './db';


db
  .insert(usersTable)
  .values({
    email: "test@test.com",
    password: "password",
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .execute();