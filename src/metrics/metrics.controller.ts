import { Controller, Get, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { BaseResponse } from 'src/common/baseResponse';
import { Metrics } from 'src/entities';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Get('/filterByTribe/:idTribe')
    async getMetrics(@Param('idTribe', ParseIntPipe) idTribe: number): Promise<BaseResponse<any>> {
        const response = await this.metricsService.getMetrics(idTribe);
        return new BaseResponse<any>(response);
    }

}
