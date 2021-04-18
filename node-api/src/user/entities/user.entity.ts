import { UserProfile } from '../../user-profile/entities/user-profile.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { DB_TABLES } from '../../constants';

@Entity({ name: DB_TABLES.User })
export class User {
  @Column()
  @PrimaryColumn()
  @OneToOne(() => UserProfile, (profile) => profile.email)
  email: string;

  @Column()
  password: string;
}
