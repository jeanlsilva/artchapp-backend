import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { Specialty } from './entities/specialty.entity';

@Module({
  controllers: [SpecialtyController],
  providers: [SpecialtyService],
  imports: [TypeOrmModule.forFeature([Specialty])],
  exports: [SpecialtyService],
})
export class SpecialtyModule {}
