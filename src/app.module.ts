import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      port: parseInt(process.env.POSTGRES_PORT),
      type: 'postgres',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    LocationModule,
  ],
})
export class AppModule {}
