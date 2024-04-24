import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioTagsService } from './portfolio-tags.service';
import { PortfolioTagsController } from './portfolio-tags.controller';
import { PortfolioTag } from './entities/portfolio-tag.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';

@Module({
  controllers: [PortfolioTagsController],
  imports: [TypeOrmModule.forFeature([PortfolioTag, Portfolio])],
  exports: [PortfolioTagsService],
  providers: [PortfolioTagsService],
})
export class PortfolioTagsModule {}
