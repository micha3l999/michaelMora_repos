import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Organizations } from "./organizations";
import { Repositories } from "./repositories";

@Entity()
export class Tribes {
    @PrimaryGeneratedColumn({
        name: 'id_tribe',
        type: 'int'
    })
    id: number;

    @Column({
        type: 'char',
        length: 50,
    })
    name: string;

    @Column({
        type: 'int',
    })
    status: number;

    @Column({
        type: 'int',
        name: 'id_organization',
    })
    @ManyToOne(() => Organizations, (organization) => organization.tribes)
    idOrganization: Organizations;

    @OneToMany(() => Repositories, (repository) => repository.idTribe)
    repositories: Repositories[];
    
}