import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../../user/user.entity';

@Entity('rating')
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  rate: number;

  @Column({ nullable: true, length: 500 })
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
