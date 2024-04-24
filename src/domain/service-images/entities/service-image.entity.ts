import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from '../../service/entities/service.entity';

@Entity('service_images')
export class ServiceImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 1000 })
  url: string;

  @Column({ nullable: false, length: 1000 })
  ref: string;

  @Column({ nullable: false })
  main: boolean;

  @Column({ nullable: false })
  weight: number;

  @Column({ nullable: true, length: 255 })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Service)
  @JoinColumn()
  service: Service;
}
