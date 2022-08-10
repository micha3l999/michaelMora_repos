import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BaseResponse } from 'src/common/baseResponse';
import { Repositories } from 'src/entities';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {
    constructor(private readonly repositoriesService: RepositoriesService) {}

    @Get('/:idTribe')
    async getRepositories(@Param('idTribe', ParseIntPipe) idTribe: number): Promise<BaseResponse<Repositories[]>> {
        const response = await this.repositoriesService.getRepositories(idTribe);
        return new BaseResponse<Repositories[]>(response);
    }
}
