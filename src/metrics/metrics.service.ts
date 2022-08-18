import * as fs from 'fs';
import * as fastcsv from 'fast-csv';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MockServiceService } from 'src/mockService/mockService.service';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { TribesService } from 'src/tribes/tribes.service';
import { MetricsMapper } from './mapper/metricsMapper';
import { MetricsResponse } from './models/metricsResponse';
import { MetricsRepositoryResponse } from './models/metricsRepositoryResponse';
import { join } from 'path';

@Injectable()
export class MetricsService {
    constructor(
        private readonly repositoriesService: RepositoriesService,
        private readonly tribesService: TribesService,
        private readonly mockServiceService: MockServiceService,
    ) {}

    async getMetrics(idTribe: number): Promise<MetricsRepositoryResponse> {
        // Search if the tribe exist if not it throws an exception
        const tribe = await this.tribesService.getTribe(idTribe);

        const respositories =
            await this.repositoriesService.getRepositoriesByFilter(idTribe);

        const mockServiceResponse =
            this.mockServiceService.getMockRepositories();
        return MetricsMapper.mapMetricsResponse(
            respositories,
            mockServiceResponse,
            tribe,
        );
    }

    generatecsvFile(metricsResponse: MetricsRepositoryResponse) {
        const writeStream = fs.createWriteStream(join(process.cwd(),'public/data.csv'));
        fastcsv
            .write(metricsResponse.repositories, { headers: true })
            .on('finish', () => {
            })
            .pipe(writeStream);
        const readStream = fs.createReadStream(join(process.cwd(),'public/data.csv'));
        readStream.on('error', (err) => { throw new InternalServerErrorException('Error in readable stream'); });
        return readStream;
    }
}
