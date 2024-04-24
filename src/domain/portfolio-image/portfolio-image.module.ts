import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioImagesService } from './portfolio-image.service';
import { PortfolioImageController } from './portfolio-image.controller';
import { PortfolioImage } from './entities/portfolio-image.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { PortfolioService } from '../portfolio/portfolio.service';
import { PortfolioTag } from '../portfolio-tags/entities/portfolio-tag.entity';
import { Package } from '../package/entities/package.entity';

@Module({
  controllers: [PortfolioImageController],
  providers: [PortfolioImagesService, PortfolioService],
  imports: [TypeOrmModule.forFeature([PortfolioImage, Portfolio, PortfolioTag, Package])],
  exports: [PortfolioImagesService],
})
export class PortfolioImageModule {}
