import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/baseResponse';
import { Organizations } from 'src/entities';
import { CreateOrganizationDto } from './dto/CreateOrganization.dto';
import { UpdateOrganizationDto } from './dto/UpdateOrganization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
@ApiTags('Organizations')
export class OrganizationsController {
    constructor(private readonly organizationsService: OrganizationsService) {}

    @Post('')
    @ApiOperation({ summary: 'Create an organization' })
    @ApiResponse({
        status: 200,
        description: 'Post create organization successfully',
        type: BaseResponse<Organizations>,
      })
    async postOrganization(
        @Body() createOrganizationDto: CreateOrganizationDto,
    ): Promise<BaseResponse<Organizations>> {
        const newOrganization =
            await this.organizationsService.createOrganization(
                createOrganizationDto,
            );
        return new BaseResponse<Organizations>(newOrganization);
    }

    @Get('')
    @ApiOperation({ summary: 'Get all organizations created' })
    @ApiResponse({
        status: 200,
        description: 'Get successfully',
        type: BaseResponse<Organizations[]>,
      })
    async getOrganizations(): Promise<BaseResponse<Organizations[]>> {
        const organizations =
            await this.organizationsService.getOrganizations();
        return new BaseResponse<Organizations[]>(organizations);
    }

    @Put('/:idOrganization')
    @ApiOperation({ summary: 'Update an organization by Id' })
    @ApiResponse({
        status: 200,
        description: 'Update successfully',
        type: BaseResponse<UpdateOrganizationDto>,
      })
    async updateOrganization(
        @Param('idOrganization', ParseIntPipe) idOrganization: number,
        @Body() updateOrganizationDto: UpdateOrganizationDto,
    ): Promise<BaseResponse<Organizations>> {
        const organization =
            await this.organizationsService.updateOrganization(idOrganization, updateOrganizationDto);
        return new BaseResponse<Organizations>(organization);
    }

    @Delete('/:idOrganization')
    @ApiOperation({ summary: 'Delte an organization by Id' })
    @ApiResponse({
        status: 200,
        description: 'Delete successfully',
        type: BaseResponse<Organizations>,
      })
    async deleteOrganization(@Param('idOrganization', ParseIntPipe) idOrganization: number): Promise<Organizations> {
        const organization =
            await this.organizationsService.deleteOrganization(idOrganization);
        return organization;
    }
}
