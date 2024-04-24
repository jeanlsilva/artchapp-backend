import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageImagesService } from './package-images.service';
import { PackageImagesController } from './package-images.controller';
import { PackageImage } from './entities/package-image.entity';
import { PackageService } from '../package/package.service';
import { Package } from '../package/entities/package.entity';
import { Service } from '../service/entities/service.entity';
import { PackageTagsService } from '../package-tags/package-tags.service';
import { PackageTag } from '../package-tags/entities/package-tag.entity';

@Module({
  controllers: [PackageImagesController],
  providers: [PackageImagesService, PackageService, PackageTagsService],
  imports: [TypeOrmModule.forFeature([PackageImage, Package, Service, PackageTag])],
  exports: [PackageImagesService],
})
export class PackageImagesModule {}
