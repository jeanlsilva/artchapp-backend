import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceImagesService } from './service-images.service';
import { ServiceImagesController } from './service-images.controller';
import { ServiceImage } from './entities/service-image.entity';
import { ServiceService } from '../service/service.service';
import { Service } from '../service/entities/service.entity';
import { ServiceTag } from '../service-tags/entities/service-tag.entity';

@Module({
  controllers: [ServiceImagesController],
  providers: [ServiceImagesService, ServiceService],
  imports: [TypeOrmModule.forFeature([ServiceImage, Service, ServiceTag])],
  exports: [ServiceImagesService, ServiceService],
})
export class ServiceImagesModule {}
