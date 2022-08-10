import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Repositories } from "./repositories";

@Entity()
export class Metrics {

    @Column({
        primary: true,
        generated: false,
        name: 'id_repository',
        type: 'int',
    })
    @OneToOne(() => Repositories, (repository) => repository.metrics)
    @JoinColumn({ name: 'id_repository' })
    repository: Repositories;

    @PrimaryGeneratedColumn({
        name: 'id_tribe',
        type: 'int',
    })
    id: number;

    @Column({
        type: 'decimal',
    })
    coverage: number;

    @Column({
        type: 'int',
    })
    bugs: number;

    @Column({
        type: 'int',
    })
    vulnerabilities: number;

    @Column({
        type: 'int',
    })
    hotspot: number;

    @Column({
        type: 'int',
        name: 'code_smells'
    })
    codeSmells: number;
}