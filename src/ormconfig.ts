import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { Service } from './domain/service/entities/service.entity';
import { Skill } from './domain/skill/entities/skill.entity';
import { Specialty } from './domain/specialty/entities/specialty.entity';
import User from './domain/user/user.entity';
import UserType from './domain/user/userType.entity';
import UserAddress from './domain/user-address/entities/user-address.entity';
import { UserAvatar } from './domain/user-avatar/entities/user-avatar.entity';
import { Board } from './domain/board/entities/board.entity';
import { Portfolio } from './domain/portfolio/entities/portfolio.entity';
import { Package } from './domain/package/entities/package.entity';
import { Purchase } from './domain/purchase/entities/purchase.entity';
import { Rating } from './domain/rating/entities/rating.entity';
import { ServiceImage } from './domain/service-images/entities/service-image.entity';
import { PackageImage } from './domain/package-images/entities/package-image.entity';
import { ServiceTag } from './domain/service-tags/entities/service-tag.entity';
import { PackageTag } from './domain/package-tags/entities/package-tag.entity';
import { PortfolioTag } from './domain/portfolio-tags/entities/portfolio-tag.entity';
import { PortfolioImage } from './domain/portfolio-image/entities/portfolio-image.entity';

if (process.env.DB_HOST === null || process.env.DB_HOST === undefined) {
  dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`,
  });
}

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [
    UserType,
    User,
    UserAddress,
    UserAvatar,
    Service,
    Skill,
    Specialty,
    Board,
    Portfolio,
    PortfolioImage,
    Package,
    Purchase,
    Rating,
    ServiceImage,
    PackageImage,
    ServiceTag,
    PackageTag,
    PortfolioTag,
  ],
  synchronize: false,
  migrationsRun: false,
  logging: process.env.NODE_ENV === 'development',
  logger: 'file',
  migrations: ['build/src/database/migrations/*.js'],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  seeds: ['src/database/seeds/*{.ts,.js}'],
  factories: ['src/database/factories/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = config;
