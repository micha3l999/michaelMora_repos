import { ApiProperty } from '@nestjs/swagger';
import { MockRepositories } from './mockRepositories';

/* Mock service api response */
export class MockService {
    @ApiProperty({
        example: [
            {
                id: 1,
                state: 604,
            },
        ],
        description: 'The repositories of the mock service',
    })
    public repositories: MockRepositories[];
}
