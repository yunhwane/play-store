import { Injectable } from '@nestjs/common';
import { type DrizzleDatabase, InjectClient } from '@sixaphone/nestjs-drizzle';
import { eq } from 'drizzle-orm';
import { DBS } from 'src/database/constants';
import { Schema } from 'src/database/schema';
import { users } from 'src/database/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectClient(DBS.LOCAL)
    private readonly drizzleClient: DrizzleDatabase<'sqlite', Schema>,
  ) {}
  async save(
    email: string,
    password: string,
  ): Promise<typeof users.$inferSelect> {
    const [createdUser] = await this.drizzleClient
      .insert(users)
      .values({ email, password })
      .returning();

    return createdUser;
  }
  async findById(id: string) {
    const result = await this.drizzleClient
      .select()
      .from(users)
      .where(eq(users.id, id));
    return result[0];
  }
  async findByEmail(email: string) {
    const result = await this.drizzleClient
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result[0];
  }
}
