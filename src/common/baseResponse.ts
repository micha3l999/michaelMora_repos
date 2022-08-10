import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
    @ApiProperty({
        example: true,
        description: 'The status of the request',
      })
    public success: boolean = true;
    @ApiProperty({
        example: {},
        description: 'The data of the response',
      })
    public data: T;

    constructor(data: T) {
        this.data = data;
    }
}