
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { IsString, MaxLength, MinLength } from "class-validator";
import { TodoStatusEnum } from "src/enums/TodostatusEnum";
export class AddtodoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3,{
        message: "la taille minimale du champ name est de 3 caractère"
    })
    @MaxLength(10,{
        message: "la taille maximale du champ name est de 10 caractère"
    })
    name:string;


    @IsString()
    @IsNotEmpty()

    @MinLength(10,{
        message: "la taille minimale du champ description est de 10 caractère"
    })
    description:string;

    @IsOptional()
    @IsIn(['actif','waiting','done'])
    statut:TodoStatusEnum;

    @IsNumber()
    @IsNotEmpty()
    userId:number;

}