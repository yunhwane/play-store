import { Injectable } from '@nestjs/common';
import { InjectClient, type DrizzleDatabase } from '@sixaphone/nestjs-drizzle';
import { eq } from 'drizzle-orm';
import { DBS } from 'src/database/constants';
import { Schema } from 'src/database/schema';
import { urls } from 'src/database/url.entity';

@Injectable()
export class UrlRepository {
  constructor(
    @InjectClient(DBS.LOCAL)
    private readonly drizzleClient: DrizzleDatabase<'sqlite', Schema>,
  ) {}

  async get(slug: string) {
    const result = await this.drizzleClient
      .select()
      .from(urls)
      .where(eq(urls.slug, slug));
    return result[0];
  }

  async create(targetUrl: string) {
    const slug = new Date().getTime().toString(36);

    const result = await this.drizzleClient.transaction(async (tx) => {
      return await tx
        .insert(urls)
        .values({
          target: targetUrl,
          slug: slug,
        })
        .returning();
    });

    return result[0];
  }

  async getAll() {
    const result = await this.drizzleClient.select().from(urls);
    return result;
  }
}
