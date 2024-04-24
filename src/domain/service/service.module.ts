import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './entities/service.entity';
import { ServiceTag } from '../service-tags/entities/service-tag.entity';
import { ServiceTagsService } from '../service-tags/service-tags.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, ServiceTagsService],
  imports: [TypeOrmModule.forFeature([Service, ServiceTag])],
  exports: [ServiceService],
})
export class ServiceModule {}
