import { Injectable } from '@nestjs/common';
import { MockService } from 'src/common/mockService';

@Injectable()
export class MockServiceService {
    getMockRepositories(): MockService[] {
        return [
            {
                repositories: [
                    {
                        id: 1,
                        state: 604,
                    },
                    {
                        id: 2,
                        state: 605,
                    },
                    {
                        id: 3,
                        state: 606,
                    },
                ],
            },
        ];
    }
}
