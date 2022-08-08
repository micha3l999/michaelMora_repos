import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}