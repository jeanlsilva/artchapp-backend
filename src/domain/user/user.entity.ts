import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import UserType from './userType.entity';
import { Specialty } from '../specialty/entities/specialty.entity';
import { UserAvatar } from '../user-avatar/entities/user-avatar.entity';
import { Board } from '../board/entities/board.entity';
import { Skill } from '../skill/entities/skill.entity';
import UserAddress from '../user-address/entities/user-address.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { Package } from '../package/entities/package.entity';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true, length: 255 })
  name: string;

  @Column({ nullable: true, length: 255 })
  email: string;

  @Column({ nullable: true, length: 255 })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true, length: 500 })
  description: string;

  @Column({ nullable: true, length: 15 })
  vat_number: string;

  @Column({ nullable: false })
  firebase_uid: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, length: 255 })
  stripe_id: string;

  @ManyToOne(() => UserType)
  @JoinColumn()
  role: UserType;

  @ManyToOne(() => Specialty)
  @JoinColumn()
  specialty: Specialty;

  @ManyToOne(() => Board)
  @JoinColumn()
  board: Board;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user, { onDelete: "CASCADE" })
  portfolios: Portfolio[];

  @OneToMany(() => Package, (_package) => _package.user, { onDelete: "CASCADE" })
  packages: Package[];

  @OneToOne(() => UserAvatar, { onDelete: "CASCADE" })
  @JoinColumn()
  user_avatar: UserAvatar;

  @OneToOne(() => UserAddress, { onDelete: "CASCADE" })
  @JoinColumn()
  user_address: UserAddress;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];
}
