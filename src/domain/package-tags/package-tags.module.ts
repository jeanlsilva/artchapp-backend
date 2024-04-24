import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageTagsService } from './package-tags.service';
import { PackageTagsController } from './package-tags.controller';
import { PackageTag } from './entities/package-tag.entity';
import { Package } from '../package/entities/package.entity';

@Module({
  controllers: [PackageTagsController],
  imports: [TypeOrmModule.forFeature([PackageTag, Package])],
  exports: [PackageTagsService],
  providers: [PackageTagsService],
})
export class PackageTagsModule {}
