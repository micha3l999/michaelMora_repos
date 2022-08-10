import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metrics } from 'src/entities';
import { MockServiceModule } from 'src/mockService/mockService.module';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { TribesModule } from 'src/tribes/tribes.module';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

@Module({
    imports: [TypeOrmModule.forFeature([Metrics]), RepositoriesModule, TribesModule, MockServiceModule],
    controllers: [MetricsController],
    providers: [MetricsService],
})
export class MetricsModule {}
