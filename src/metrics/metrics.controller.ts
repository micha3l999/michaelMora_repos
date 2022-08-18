import { Controller, Get, Injectable, Param, ParseIntPipe, Res, Response, StreamableFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/baseResponse';
import { MetricsService } from './metrics.service';
import { MetricsRepositoryResponse } from './models/metricsRepositoryResponse';

@Controller('metrics')
@Injectable()
@ApiTags('Metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Get('/filterByTribe/:idTribe')
    @ApiOperation({ summary: 'Get metrics by id tribe' })
    @ApiResponse({
        status: 200,
        description: 'Get Successfully',
        type: BaseResponse<MetricsRepositoryResponse>,
      })
    async getMetrics(@Param('idTribe', ParseIntPipe) idTribe: number): Promise<BaseResponse<MetricsRepositoryResponse>> {
        const response = await this.metricsService.getMetrics(idTribe);
        return new BaseResponse<MetricsRepositoryResponse>(response);
    }

    @Get('/exportData/:idTribe')
    @ApiOperation({ summary: 'Get a csv file format with the metrics information' })
    @ApiResponse({
        status: 200,
        description: 'Get file successfully',
        type: BaseResponse<StreamableFile>,
      })
    async getFile(@Param('idTribe', ParseIntPipe) idTribe: number, @Response({ passthrough: true }) res: any): Promise<StreamableFile> {
        const response = await this.metricsService.getMetrics(idTribe);
        const filecreated = this.metricsService.generatecsvFile(response);
        res.set({
            'Content-Type': 'text/csv'
        });
        return new StreamableFile(filecreated);
    }
}
