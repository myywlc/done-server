import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Data {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public key!: string;

  @Column()
  public data?: string;
}

export default Data;
