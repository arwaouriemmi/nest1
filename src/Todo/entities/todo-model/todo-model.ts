import { TodoStatusEnum } from "src/enums/TodostatusEnum";

export class TodoModel {
    id:string;
    name:string;
    description:string;
    dateCreation:Date;
    statut:TodoStatusEnum;
    constructor(  id:string,
        name:string,
        description:string,
        dateCreation:Date,
        statut:TodoStatusEnum) {
            this.id=id;
            this.dateCreation=dateCreation;
            this.description=description;
            this.name=name;
            this.statut=statut;
        }
}
