import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceTagDto } from './dto/create-service-tag.dto';
import { UpdateServiceTagDto } from './dto/update-service-tag.dto';
import { ServiceTag } from './entities/service-tag.entity';

@Injectable()
export class ServiceTagsService {
  constructor(@InjectRepository(ServiceTag) private serviceTagRepository: Repository<ServiceTag>) {}

  async create(createSkillDto: CreateServiceTagDto) {
    return this.serviceTagRepository.save(createSkillDto);
  }

  async findAll() {
    return this.serviceTagRepository.find();
  }

  async findOne(id: string) {
    return this.serviceTagRepository.findOne(id);
  }

  async update(id: string, updateServiceTagDto: UpdateServiceTagDto) {
    return this.serviceTagRepository.update(id, updateServiceTagDto);
  }

  async remove(id: string) {
    return this.serviceTagRepository.delete(id);
  }
}
