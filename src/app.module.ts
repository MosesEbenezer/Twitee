import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/Exception-Filters/http-exception.filter';
import { ModelExceptionFilter } from './common/Exception-Filters/model-exception.filter';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TwitsModule } from './twits/twits.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(connectionOptions),
    UsersModule,
    AuthModule,
    TwitsModule,
    CommentsModule,
    LikesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ModelExceptionFilter,
    },
  ],
})
export class AppModule {}
