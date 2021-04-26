import { Column, Entity, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';

import { UserProfile } from '../../user-profile/entities/user-profile.entity';
import { DB_TABLES } from '../../constants';

@Entity({ name: DB_TABLES.User })
export class User {
  @Column()
  @PrimaryColumn()
  @OneToOne(() => UserProfile, (profile) => profile.email)
  @JoinColumn()
  email: string;

  @Column()
  password: string;
}
