import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateOrganizationDto {
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    status: number;
}