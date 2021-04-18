import { User } from './../../user/entities/user.entity';
import { DB_TABLES } from '../../constants';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({ name: DB_TABLES.UserProfile })
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToOne(() => User, (user) => user.email)
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  role: string;
}
