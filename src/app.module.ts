import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { Micro1Repository, Micro2Repository } from './app.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    HttpModule.register({}),
  ],
  controllers: [AppController],
  providers: [Micro1Repository, Micro2Repository],
})
export class AppModule {}
