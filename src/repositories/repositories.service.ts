import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repositories } from 'src/entities';
import { State } from 'src/entities/repositories';
import { NotCoverageMetric } from 'src/exceptions/NotCoverageMetric';
import { Between, Repository } from 'typeorm';

@Injectable()
export class RepositoriesService {
    constructor(
        @InjectRepository(Repositories)
        private readonly repositoriesService: Repository<Repositories>,
    ) {}

    async getRepositories(idTribe: number): Promise<Repositories[]> {
        
        return this.repositoriesService.find({
            where: { tribe: { id: idTribe }, },
            relations: ['metrics'],
        });
    }

    /* Find all repositories acordding to the exercise filters */
    async getRepositoriesByFilter(idTribe: number): Promise<Repositories[]> {
        const currentYear = new Date().getFullYear();
        
        /* Search by Enabled repositories and current year */
        const repositories = await this.repositoriesService.find({
            where: { tribe: { id: idTribe }, createTime: Between(
                this.getDateFilter(currentYear - 1), 
                this.getDateFilter(currentYear + 1),
            ),
            state: State.E,
            },
            relations: ['metrics', 'tribe'],
        });

        const resultByCoverage = this.filterRepositoriesByCoverage(repositories);
        return resultByCoverage;
    }

    /* Find repositories with enough coverage */
    private filterRepositoriesByCoverage(repositories: Repositories[]): Repositories[] {
        const repositoriesResult = repositories.filter(repository => repository.metrics.coverage > 0.75);
        if (repositoriesResult.length < 1) {
            throw new NotCoverageMetric();
        }
        return repositoriesResult;
    }

    private getDateFilter(year: number): Date {
        return new Date(year, 1, 1);
    }
}
