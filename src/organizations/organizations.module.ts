import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizations } from 'src/entities';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
    imports: [TypeOrmModule.forFeature([Organizations]),],
    controllers: [OrganizationsController],
    providers: [OrganizationsService],
})
export class OrganizationsModule {}
