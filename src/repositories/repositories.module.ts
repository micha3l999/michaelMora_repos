import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repositories } from 'src/entities';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';

@Module({
    imports: [TypeOrmModule.forFeature([Repositories])],
    controllers: [RepositoriesController],
    providers: [RepositoriesService],
    exports: [RepositoriesService],
})
export class RepositoriesModule {}
