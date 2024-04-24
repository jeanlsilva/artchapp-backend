import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(@InjectRepository(Skill) private skillRepository: Repository<Skill>) {}

  async create(createSkillDto: CreateSkillDto) {
    return this.skillRepository.save(createSkillDto);
  }

  async findAll() {
    return this.skillRepository.find();
  }

  async findOne(id: string) {
    return this.skillRepository.findOne(id);
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    return this.skillRepository.update(id, updateSkillDto);
  }

  async remove(id: string) {
    return this.skillRepository.delete(id);
  }
}
