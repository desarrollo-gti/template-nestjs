import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{

    @IsOptional()
    @IsPositive()
    //transformar a numero
    @Type(()=>Number) // esto es igual = enableImplicitConversion: true;
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type(()=> Number)
    offset?: number;
}