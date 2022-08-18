import { Controller, Get, Injectable, Param, ParseIntPipe, Res, Response, StreamableFile } from '@nestjs/common';
import { BaseResponse } from 'src/common/baseResponse';
import { MetricsService } from './metrics.service';
import { MetricsRepositoryResponse } from './models/metricsRepositoryResponse';

@Controller('metrics')
@Injectable()
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Get('/filterByTribe/:idTribe')
    async getMetrics(@Param('idTribe', ParseIntPipe) idTribe: number): Promise<BaseResponse<MetricsRepositoryResponse>> {
        const response = await this.metricsService.getMetrics(idTribe);
        return new BaseResponse<MetricsRepositoryResponse>(response);
    }

    @Get('/exportData/:idTribe')
    async getFile(@Param('idTribe', ParseIntPipe) idTribe: number, @Response({ passthrough: true }) res: any): Promise<any> {
        const response = await this.metricsService.getMetrics(idTribe);
        const filecreated = this.metricsService.generatecsvFile(response);
        res.set({
            'Content-Type': 'text/csv'
        });
        return new StreamableFile(filecreated);
    }
}
