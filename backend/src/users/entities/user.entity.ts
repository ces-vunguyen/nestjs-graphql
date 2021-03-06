import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Todo } from '../../todos/entities/todo.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
