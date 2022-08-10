import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizations } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/CreateOrganization.dto';
import { UpdateOrganizationDto } from './dto/UpdateOrganization.dto';

@Injectable()
export class OrganizationsService {
    constructor(
        @InjectRepository(Organizations)
        private readonly organizationsRepository: Repository<Organizations>,
    ) {}

    async createOrganization(
        createOrganizationDto: CreateOrganizationDto,
    ): Promise<Organizations> {
        const newOrganization = this.organizationsRepository.create(
            createOrganizationDto,
        );
        await this.organizationsRepository.save(newOrganization);
        return newOrganization;
    }

    async getOrganizations(): Promise<Organizations[]> {
        const organizations = await this.organizationsRepository.find();
        return organizations;
    }

    async updateOrganization(
        idOrganization: number,
        updateOrganizationDto: UpdateOrganizationDto,
    ): Promise<Organizations> {
        const response = await this.organizationsRepository.findOne({
            where: { id: idOrganization },
        });
        if (!response) {
            throw new BadRequestException('Organization Not found');
        }
        await this.organizationsRepository.update(
            idOrganization,
            updateOrganizationDto,
        );
        return response;
    }

    async deleteOrganization(idOrganization: number): Promise<Organizations> {
        const response = await this.organizationsRepository.findOne({
            where: { id: idOrganization },
        });
        if (!response) {
            throw new BadRequestException('Organization Not found');
        }
        await this.organizationsRepository.delete(idOrganization);
        return response;
    }
}
