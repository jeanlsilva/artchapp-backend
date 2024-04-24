import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceTag } from '../service-tags/entities/service-tag.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
    @InjectRepository(ServiceTag) private serviceTagsRepository: Repository<ServiceTag>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    return this.serviceRepository.save(createServiceDto);
  }

  async findAll() {
    return this.serviceRepository.find({
      relations: [
        'service_image',
        'serviceTags',
        'portfolio',
        'portfolio.user',
        'portfolio.user.user_address',
        'portfolio.user.specialty',
        'portfolio.user.user_avatar',
      ],
      order: {
        updated_at: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    return this.serviceRepository.findOne(id);
  }

  async findByPortfolio(portfolio: string) {
    return this.serviceRepository.find({
      relations: ['service_image', 'portfolio', 'portfolio.user'],
      where: {
        portfolio,
      },
    });
  }

  async findByUser(userId: string) {
    return this.serviceRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.service_image', 'image')
      .leftJoinAndSelect('service.portfolio', 'portfolio')
      .leftJoinAndSelect('service.serviceTags', 'tags')
      .leftJoinAndSelect('portfolio.user', 'professional')
      .leftJoinAndSelect('professional.user_address', 'address')
      .where('professional.uuid = :userId', { userId })
      .orderBy('service.updated_at', 'DESC')
      .getMany();
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.serviceRepository.update(id, updateServiceDto);
  }

  async remove(id: string) {
    return this.serviceRepository.delete(id);
  }

  async addTagToService(serviceId: string, tags: string[]) {
    const tagsArr = await this.serviceTagsRepository.findByIds(tags);

    const service = await this.serviceRepository.findOne(serviceId, { relations: ['serviceTags'] });

    service.serviceTags = [...service.serviceTags, ...tagsArr];

    return this.serviceRepository.save(service);
  }

  async removeTagFromService(serviceId: string, tagId: string) {
    const service = await this.serviceRepository.findOne(serviceId, { relations: ['serviceTags'] });

    service.serviceTags = service.serviceTags.filter((tag) => tag.id !== tagId);

    await this.serviceRepository.save(service);
  }
}
