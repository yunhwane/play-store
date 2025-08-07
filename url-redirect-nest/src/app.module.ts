import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from '@sixaphone/nestjs-drizzle';
import { DBS } from './database/constants';
import { schema } from './database/schema';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    DrizzleModule.forRoot({
      type: 'sqlite',
      name: DBS.LOCAL,
      url: 'file:url.db',
      schema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
