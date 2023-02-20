import { AddtodoDto } from "./add-todo.dto";
import { PartialType} from "@nestjs/mapped-types";
export class UpdatetodoDto extends PartialType(AddtodoDto) {
    
   

}