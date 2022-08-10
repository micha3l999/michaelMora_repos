import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => Organizations, (organization) => organization.tribes)
    @JoinColumn({ name: 'id_organization' })
    organization: Organizations;

    @OneToMany(() => Repositories, (repository) => repository.tribe)
    repositories: Repositories[];
    
}