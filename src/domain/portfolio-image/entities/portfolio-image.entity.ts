import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';

@Entity('portfolio_images')
export class PortfolioImage {
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

  @ManyToOne(() => Portfolio, { onDelete: 'CASCADE' })
  portfolio: Portfolio;
}
