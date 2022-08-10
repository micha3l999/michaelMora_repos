import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Metrics } from "./metrics";
import { Tribes } from "./tribes";

@Entity()
export class Repositories {
    @PrimaryGeneratedColumn({
        name: 'id_repository',
        type: 'int',
    })
    id: number;

    @Column({
        type: 'char',
        length: 50,
    })
    name: string;

    @Column({
        type: 'char',
        length: 1,
    })
    state: string;

    @CreateDateColumn({
        type: 'timestamptz',
        name: 'create_time',
    })
    createTime: Date;

    @Column({
        type: 'char',
        length: 1,
    })
    status: string;

    @JoinColumn({ name: 'id_tribe' })
    @ManyToOne(() => Tribes, (tribe) => tribe.repositories)
    tribe: Tribes;

    @OneToOne(() => Metrics, (metrics) => metrics.repository)
    metrics: Metrics;
}