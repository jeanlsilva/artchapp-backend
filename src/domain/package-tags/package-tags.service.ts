import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceTag } from '../service-tags/entities/service-tag.entity';
import { CreatePackageTagDto } from './dto/create-package-tag.dto';
import { UpdatePackageTagDto } from './dto/update-package-tag.dto';
import { PackageTag } from './entities/package-tag.entity';

@Injectable()
export class PackageTagsService {
  constructor(@InjectRepository(PackageTag) private packageTagRepository: Repository<ServiceTag>) {}

  async create(createPackageTagDto: CreatePackageTagDto) {
    return this.packageTagRepository.save(createPackageTagDto);
  }

  async findAll() {
    return this.packageTagRepository.find();
  }

  async findOne(id: string) {
    return this.packageTagRepository.findOne(id);
  }

  async update(id: string, updatepackageTagDto: UpdatePackageTagDto) {
    return this.packageTagRepository.update(id, updatepackageTagDto);
  }

  async remove(id: string) {
    return this.packageTagRepository.delete(id);
  }
}
