import { DB_TABLES } from './../../constants';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: DB_TABLES.Project })
export class Project {
  @Column()
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'created_at' })
  createdAt: number;

  @Column({ name: 'edited_at' })
  editedAt: number;
}
