import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{

    @ApiProperty({
        default:10, description:'How many rows do you need'
    })
    @IsOptional()
    @IsPositive()
    //transformar a numero
    @Type(()=>Number) // esto es igual = enableImplicitConversion: true;
    limit?: number;

    @ApiProperty({
        default:0, description:'How many rows do you want skip'
    })    
    @IsOptional()
    @Min(0)
    @Type(()=> Number)
    offset?: number;
}