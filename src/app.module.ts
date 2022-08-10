import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities, { Organizations } from './entities';
import { GlobalExceptionFilter } from './exceptions/GlobalExceptionFilter';
import { MockServiceModule } from './mockService/mockService.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { MetricsModule } from './metrics/metrics.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { TribesModule } from './tribes/tribes.module';

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
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
