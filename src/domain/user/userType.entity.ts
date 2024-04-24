import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import User from './user.entity';

@Entity('user_types')
export default class UserType {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  slug: string;

  @Column()
  label: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => User, (user) => user.role)
  user: User;
}
