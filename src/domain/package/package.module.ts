import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { Package } from './entities/package.entity';
import { ServiceService } from '../service/service.service';
import { Service } from '../service/entities/service.entity';
import { PackageImagesService } from '../package-images/package-images.service';
import { PackageImage } from '../package-images/entities/package-image.entity';
import { ServiceTag } from '../service-tags/entities/service-tag.entity';
import { PackageTagsService } from '../package-tags/package-tags.service';
import { PackageTag } from '../package-tags/entities/package-tag.entity';
import { PortfolioService } from '../portfolio/portfolio.service';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { PortfolioTagsService } from '../portfolio-tags/portfolio-tags.service';
import { PortfolioTag } from '../portfolio-tags/entities/portfolio-tag.entity';

@Module({
  controllers: [PackageController],
  providers: [
    PackageService,
    ServiceService,
    PackageImagesService,
    PackageTagsService,
    PortfolioService,
    PortfolioTagsService,
  ],
  imports: [
    TypeOrmModule.forFeature([Package, Service, PackageImage, ServiceTag, PackageTag, Portfolio, PortfolioTag]),
  ],
  exports: [PackageService],
})
export class PackageModule {}
