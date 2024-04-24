import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Package } from '../../package/entities/package.entity';
import { PortfolioImage } from '../../portfolio-image/entities/portfolio-image.entity';
import { PortfolioTag } from '../../portfolio-tags/entities/portfolio-tag.entity';
import { Service } from '../../service/entities/service.entity';
import User from '../../user/user.entity';

@Entity('portfolio')
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 255 })
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Service, (service) => service.portfolio)
  services: Service[];

  @ManyToMany(() => Package, (_package) => _package.portfolios, {
    cascade: true,
  })
  @JoinTable()
  packages: Package[];

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToOne(() => PortfolioImage, { onDelete: "CASCADE" })
  @JoinColumn()
  portfolioImages: PortfolioImage;

  @ManyToMany(() => PortfolioTag, (portfolioTag) => portfolioTag.portfolios)
  portfolioTags: PortfolioTag[];
}
