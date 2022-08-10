import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateOrganizationDto {
    @ApiProperty({
        example: 'NTTDATA',
        description: 'The name of the organization to create',
    })
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        example: 605,
        description: 'Status of the Organization',
    })
    @IsNotEmpty()
    status: number;
}