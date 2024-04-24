import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PackageImage } from '../../package-images/entities/package-image.entity';
import { PackageTag } from '../../package-tags/entities/package-tag.entity';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';
import User from '../../user/user.entity';
import { Service } from '../../service/entities/service.entity';

@Entity('package')
export class Package {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 255 })
  slug: string;

  @Column({ nullable: false, length: 255 })
  label: string;

  @Column({ nullable: true, length: 500 })
  description: string;

  @Column({ nullable: true, length: 500 })
  whatsIncluded: string;

  @Column({ nullable: true, default: true })
  active: boolean;

  @Column({ nullable: false })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, length: 255 })
  stripe_price_id: string;

  @OneToOne(() => PackageImage, { onDelete: "CASCADE" })
  @JoinColumn()
  package_image: PackageImage;

  @ManyToMany(() => Portfolio, { onDelete: "CASCADE" })
  @JoinTable()
  portfolios: Portfolio[];

  @ManyToOne(() => User, (user) => user.packages, { onDelete: "CASCADE" })
  user: User;

  @ManyToMany(() => PackageTag, (tag) => tag.packages)
  packageTags: PackageTag[];

  @ManyToMany(() => Service, (service) => service.packages, {
    cascade: true,
  })
  @JoinTable({
    name: 'package_services',
    joinColumn: {
      name: 'package',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'service',
      referencedColumnName: 'id',
    },
  })
  services: Service[];
}
