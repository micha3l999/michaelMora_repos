import { ApiProperty } from '@nestjs/swagger';

export class MockRepositories {
    @ApiProperty({
        example: 1,
        description: 'Id of the mock repository',
      })
    public id: number;
    @ApiProperty({
        example: 605,
        description: 'The state of the mock repository',
      })
    public state: number;
}