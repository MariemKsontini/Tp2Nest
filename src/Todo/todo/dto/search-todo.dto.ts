import { IsEnum, IsOptional } from "class-validator";
import { statusEnum } from "../entities/statusEnum";


export class searchTodoDTO {
    @IsOptional()
    critere: string;
    @IsOptional()
    @IsEnum(statusEnum)
    statut : statusEnum
}