import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tribes } from './tribes';

@Entity()
export class Organizations {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id_organization',
    })
    id: number;

    @Column({
        nullable: false,
        length: 50,
    })
    name: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    status: number;

    @OneToMany(() => Tribes, (tribe) => tribe.idOrganization)
    tribes: Tribes[]
}
