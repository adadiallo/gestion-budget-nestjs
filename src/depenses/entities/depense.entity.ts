import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Depense {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    titre:string
    @Column()
    montant:number
}
