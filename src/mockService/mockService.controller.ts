import { Controller, Get } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/baseResponse';
import { MockService } from 'src/common/mockService';
import { MockServiceService } from './mockService.service';

@ApiTags('mockService')
@Controller('mockService')
export class MockServiceController {
    constructor(private readonly mockServiceService: MockServiceService) {}

    @Get()
    @ApiOperation({ summary: 'Get mock repositories' })
    @ApiResponse({
        status: 200,
        description: 'Get mock repositories',
        type: BaseResponse<MockService>,
      })
    getMockRepositories(): BaseResponse<MockService> {
        const repositories = this.mockServiceService.getMockRepositories()
        return new BaseResponse<MockService>(repositories);
    }
}
