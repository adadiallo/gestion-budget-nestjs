import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('depense')

export class Depense {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    titre:string
    @Column()
    montant:number
}
