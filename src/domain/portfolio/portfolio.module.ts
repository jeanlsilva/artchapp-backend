import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioTagsService } from '../portfolio-tags/portfolio-tags.service';
import { PortfolioTag } from '../portfolio-tags/entities/portfolio-tag.entity';
import { PackageService } from '../package/package.service';
import { Package } from '../package/entities/package.entity';
import { ServiceService } from '../service/service.service';
import { Service } from '../service/entities/service.entity';
import { PackageTagsService } from '../package-tags/package-tags.service';
import { PackageTag } from '../package-tags/entities/package-tag.entity';
import { ServiceTagsService } from '../service-tags/service-tags.service';
import { ServiceTag } from '../service-tags/entities/service-tag.entity';
import { PortfolioImagesService } from '../portfolio-image/portfolio-image.service';
import { PortfolioImage } from '../portfolio-image/entities/portfolio-image.entity';

@Module({
  controllers: [PortfolioController],
  providers: [
    PortfolioService,
    PortfolioTagsService,
    PackageService,
    ServiceService,
    PackageTagsService,
    ServiceTagsService,
    PortfolioImagesService,
  ],
  imports: [
    TypeOrmModule.forFeature([Portfolio, PortfolioTag, Package, Service, PackageTag, ServiceTag, PortfolioImage]),
  ],
  exports: [PortfolioService],
})
export class PortfolioModule {}
