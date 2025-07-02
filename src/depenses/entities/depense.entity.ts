import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Depense {
    @PrimaryGeneratedColumn()
    id:string;
    @Column()
    titre:string
    @Column()
    montant:number
}
