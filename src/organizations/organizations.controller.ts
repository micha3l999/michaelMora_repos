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
    @UsePipes(ValidationPipe)
    postOrganizations(@Body() createOrganizationDto: CreateOrganizationDto): BaseResponse<Organizations> {
        return new BaseResponse<Organizations>(this.organizationsService.createOrganization(createOrganizationDto));
    }
}
