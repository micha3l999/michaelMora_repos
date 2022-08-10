import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities, { Organizations } from './entities';
import { MockServiceModule } from './mockService/mockService.module';
import { OrganizationsModule } from './organizations/organizations.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
