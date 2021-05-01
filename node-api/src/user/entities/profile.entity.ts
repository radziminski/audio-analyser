import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { DB_TABLES } from '../../constants';

@Entity({ name: DB_TABLES.UserProfile })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;
}
