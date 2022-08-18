import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import entities, { Organizations } from './entities';
import { GlobalExceptionFilter } from './exceptions/GlobalExceptionFilter';
import { MockServiceModule } from './mockService/mockService.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { MetricsModule } from './metrics/metrics.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { TribesModule } from './tribes/tribes.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'cockroachdb',
        url: configService.get('DB_URL'),
        ssl: true,
        extra: {
          options: configService.get('DB_OPTIONS')
        },
        synchronize: true,
        entities: entities,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Organizations]),
    MockServiceModule,
    OrganizationsModule,
    MetricsModule,
    RepositoriesModule,
    TribesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {}
