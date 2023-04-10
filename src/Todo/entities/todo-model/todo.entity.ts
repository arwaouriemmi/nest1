import { TodoStatusEnum } from "src/enums/TodostatusEnum";
import { TimestampEntities } from "src/Generic/timestamp.entities";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('todo')
export class TodoEntity extends TimestampEntities {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    

    @Column()
    description:string;
  
    @Column()
    statut:TodoStatusEnum;
 
    @Column()
    userId:number;
    @Column({ nullable: true })
    token: string;

}
