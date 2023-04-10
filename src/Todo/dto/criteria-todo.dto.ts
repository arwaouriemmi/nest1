import { IsIn } from "class-validator";
import { TodoStatusEnum } from "src/enums/TodostatusEnum";
export class CriteriatodoDto {
    critere:string ; 
    
    @IsIn(['actif','waiting','done'])
    statut:TodoStatusEnum;
}