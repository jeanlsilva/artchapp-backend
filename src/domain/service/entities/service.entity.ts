import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceImage } from '../../service-images/entities/service-image.entity';
import { Package } from '../../package/entities/package.entity';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';
import { ServiceTag } from '../../service-tags/entities/service-tag.entity';

@Entity('service')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 255 })
  slug: string;

  @Column({ nullable: false, length: 255 })
  label: string;

  @Column({ nullable: true, length: 500 })
  description: string;

  @Column({ nullable: false })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => ServiceImage)
  @JoinColumn()
  service_image: ServiceImage;

  @ManyToOne(() => Portfolio)
  @JoinColumn()
  portfolio: Portfolio;

  @ManyToMany(() => Package, (_package) => _package.services)
  packages: Package[];

  @ManyToMany(() => ServiceTag, (serviceTag) => serviceTag.services)
  serviceTags: ServiceTag[];
}
