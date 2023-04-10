import { AddtodoDto } from "./add-todo.dto";
import { PartialType} from "@nestjs/mapped-types";
import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { TodoStatusEnum } from "src/enums/TodostatusEnum";
export class UpdatetodoDto {
    @IsString()
    @IsOptional()
    @MinLength(3,{
        message: "la taille minimale du champ name est de 3 caractère"
    })
    @MaxLength(10,{
        message: "la taille maximale du champ name est de 10 caractère"
    })
    name:string;


    @IsString()
    @IsOptional()
    @MinLength(10,{
        message: "la taille minimale du champ description est de 10 caractère"
    })
    description:string;


    @IsOptional()
    @IsIn(['actif','waiting','done'])
    statut:TodoStatusEnum;
   

}