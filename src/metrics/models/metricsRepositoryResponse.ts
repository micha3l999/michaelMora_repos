import { ApiProperty } from "@nestjs/swagger";
import { MetricsResponse } from "./metricsResponse";

export class MetricsRepositoryResponse {
    @ApiProperty({
        example: '',
        description: 'The respositories collection',
    })
    public repositories: MetricsResponse[];
}