import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizations } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/CreateOrganization.dto';

@Injectable()
export class OrganizationsService {
    constructor(@InjectRepository(Organizations) private readonly organizationsRepository: Repository<Organizations>) {}

    createOrganization(createOrganizationDto: CreateOrganizationDto): Organizations {
        const newOrganization = this.organizationsRepository.create(createOrganizationDto);
        this.organizationsRepository.save(newOrganization);
        return newOrganization;
    }
}
