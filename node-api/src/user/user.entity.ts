import { DB_TABLES } from './../constants';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: DB_TABLES.UserProfile })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;
}
