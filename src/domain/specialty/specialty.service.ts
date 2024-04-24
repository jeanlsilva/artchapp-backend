import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialtyService {
  constructor(@InjectRepository(Specialty) private specialtyRepository: Repository<Specialty>) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyRepository.save(createSpecialtyDto);
  }

  async findAll() {
    return this.specialtyRepository.find();
  }

  async findOne(id: string) {
    return this.specialtyRepository.findOne(id);
  }

  async update(id: string, updateSpecialtyDto: UpdateSpecialtyDto) {
    return this.specialtyRepository.update(id, updateSpecialtyDto);
  }

  async remove(id: string) {
    return this.specialtyRepository.delete(id);
  }
}
