import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Package } from '../../package/entities/package.entity';

@Entity('package_images')
export class PackageImage {
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

  @ManyToOne(() => Package, { onDelete: 'CASCADE' })
  package: Package;
}
