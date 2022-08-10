import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'https';
import { BaseResponse } from 'src/common/baseResponse';
import { Organizations } from 'src/entities';
import { CreateOrganizationDto } from './dto/CreateOrganization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
    constructor(private readonly organizationsService: OrganizationsService) {}

    @Post('')
    async postOrganizations(@Body() createOrganizationDto: CreateOrganizationDto): Promise<BaseResponse<Organizations>> {
        const newOrganization = await this.organizationsService.createOrganization(createOrganizationDto);
        return new BaseResponse<Organizations>(newOrganization);
    }

    @Get('')
    async getOrganizations(): Promise<BaseResponse<Organizations[]>> {
        const organizations = await this.organizationsService.getOrganizations();
        return new BaseResponse<Organizations[]>(organizations);
    }
}
