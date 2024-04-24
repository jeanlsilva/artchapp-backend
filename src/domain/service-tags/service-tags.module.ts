import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceTagsService } from './service-tags.service';
import { ServiceTagsController } from './service-tags.controller';
import { Service } from '../service/entities/service.entity';
import { ServiceService } from '../service/service.service';
import { ServiceTag } from './entities/service-tag.entity';

@Module({
  controllers: [ServiceTagsController],
  imports: [TypeOrmModule.forFeature([ServiceTag, Service])],
  exports: [ServiceTagsService],
  providers: [ServiceTagsService, ServiceService],
})
export class ServiceTagsModule {}
