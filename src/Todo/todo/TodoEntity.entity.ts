import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { statusEnum } from './entities/statusEnum';
import { todoDate } from './tododate';

@Entity('todo')
export class TodoEntity extends todoDate  {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: statusEnum,
    default: statusEnum.EnAttente,
  })
  status: string;
}