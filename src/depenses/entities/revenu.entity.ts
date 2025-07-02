import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Revenu {
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    titre:string;
    @Column()
    montant:number;

}