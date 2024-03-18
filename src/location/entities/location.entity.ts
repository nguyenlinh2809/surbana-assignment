import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  building: string;

  @Column()
  locationName: string;

  @Column()
  locationNumber: string;

  @Column()
  area: string;

  @Column({
    unique: true,
    nullable: true,
  })
  parentId: number;
}
