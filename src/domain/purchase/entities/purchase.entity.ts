import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from '../../service/entities/service.entity';
import { Package } from '../../package/entities/package.entity';
import User from '../../user/user.entity';

@Entity('purchase')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 255 })
  payment_method: string;

  @Column({ nullable: true, length: 255 })
  delivery_address: string;

  @Column({ nullable: true, length: 255 })
  title: string;

  @Column({ nullable: false })
  finished: boolean;

  @Column({ nullable: false })
  size: number;

  @Column({ nullable: false })
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Package)
  @JoinColumn()
  package: Package;
}
