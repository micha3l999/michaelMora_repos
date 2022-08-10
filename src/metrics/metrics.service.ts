import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Metrics } from 'src/entities';
import { MockServiceService } from 'src/mockService/mockService.service';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { TribesService } from 'src/tribes/tribes.service';
import { Repository } from 'typeorm';
import { MetricsMapper } from './mapper/metricsMapper';

@Injectable()
export class MetricsService {
    constructor(
        @InjectRepository(Metrics) private readonly metricsRepository: Repository<Metrics>,
        private readonly repositoriesService: RepositoriesService,
        private readonly tribesService: TribesService,
        private readonly mockServiceService: MockServiceService,
    ) {}

    async getMetrics(idTribe: number): Promise<any> {
        // Search if the tribe exist if not it throws an exception
        const tribe = await this.tribesService.getTribe(idTribe);

        const respositories = await this.repositoriesService.getRepositoriesByFilter(idTribe);

        const mockServiceResponse = this.mockServiceService.getMockRepositories();
        return MetricsMapper.mapMetricsResponse(respositories, mockServiceResponse, tribe);
    }
}
