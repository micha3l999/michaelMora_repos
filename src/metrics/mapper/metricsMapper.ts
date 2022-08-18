import { MockRepositories } from 'src/common/mockRepositories';
import { MockService } from 'src/common/mockService';
import { Repositories, Tribes } from 'src/entities';
import { REPOSITORY_STATE, VERIFICATION_STATUS } from 'src/helpers/constants';
import { MetricsRepositoryResponse } from '../models/metricsRepositoryResponse';
import { MetricsResponse } from '../models/metricsResponse';

export class MetricsMapper {
    public static mapMetricsResponse(
        repositories: Repositories[],
        mockService: MockService,
        tribe: Tribes,
    ) {
        const repositoriesMapped = repositories.map((repo, index) => {
            const mockServiceRepo: MockRepositories | undefined  = mockService.repositories.find(repoMock => repoMock.id == repo.id);
            const mockState = mockServiceRepo?.state.toString() ?? null;
            const verificationState = mockState ? VERIFICATION_STATUS[mockState as keyof typeof VERIFICATION_STATUS] : null;
            const metricsResponse: MetricsResponse = {
                id: repo.id,
                name: repo.name,
                tribe: repo.tribe.name,
                organization: tribe.organization.name,
                coverage: `${repo.metrics.coverage * 100}%`,
                codeSmells: repo.metrics.codeSmells,
                bugs: repo.metrics.bugs,
                vulnerabilities: repo.metrics.vulnerabilities,
                hotspot: repo.metrics.hotspot,
                verificationState: verificationState,
                state: REPOSITORY_STATE[repo.state],
            };
            return metricsResponse;
        });
        const metricsRepositoryResponse: MetricsRepositoryResponse = {
            repositories: repositoriesMapped,
        };
        return metricsRepositoryResponse;
    }
}
