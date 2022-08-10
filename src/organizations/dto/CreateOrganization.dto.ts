import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateOrganizationDto {
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    status: number;
}