import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { stripe } from '../../stripe/stripe.controller';
import { PackageTag } from '../package-tags/entities/package-tag.entity';
import { Service } from '../service/entities/service.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package) private packageRepository: Repository<Package>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
    @InjectRepository(PackageTag) private packageTagRepository: Repository<PackageTag>,
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    const { services: serviceIds, ...rest } = createPackageDto;
    const services = await this.serviceRepository.findByIds(serviceIds);
    const price = await stripe.prices.create({
      unit_amount: createPackageDto.price,
      currency: createPackageDto.currency,
      product_data: {
        name: createPackageDto.label,
      },
    });

    return this.packageRepository.save({
      services,
      stripe_price_id: price.id,
      ...rest,
    });
  }

  async findAll() {
    return this.packageRepository.find({
      relations: [
        'package_image',
        'packageTags',
        'portfolios',
        'user',
        'user.user_address',
        'user.specialty',
        'user.user_avatar',
      ],
      order: {
        updated_at: 'DESC',
      },
      where: {
        active: true,
      },
    });
  }

  async findPaginatedResults(page: number, limit: number) {
    const qb = this.packageRepository.createQueryBuilder('package');
    qb
      .leftJoinAndSelect('package.package_image', 'package_image')
      .leftJoinAndSelect('package.packageTags', 'portfolio_tags')
      .leftJoinAndSelect('package.portfolios', 'portfolios')
      .leftJoinAndSelect('package.user', 'user')
      .leftJoinAndSelect('user.user_avatar', 'user_avatar')
      .leftJoinAndSelect('user.user_address', 'user_address')
      .leftJoinAndSelect('user.specialty', 'specialty')
      .orderBy('package.updated_at', 'DESC')
      .where('package.active = true')
      .skip(page * limit)
      .take(limit)
    
    const nextPage = (await this.packageRepository.find({ skip: (page + 1) * limit })).length > 0 ? 
    `/package/page?page=${page + 1}&limit=${limit}` : undefined;

    const items = await qb.getMany();

    return {
      items,
      nextPage
    };
  }

  async find10Recent() {
    return this.packageRepository.find({
      relations: [
        'package_image',
        'packageTags',
        'portfolios',
        'user',
        'user.user_address',
        'user.specialty',
        'user.user_avatar',
      ],
      order: {
        updated_at: 'DESC',
      },
      where: {
        active: true,
      },
      take: 10,
    });
  }

  async findOne(id: string) {
    return this.packageRepository.findOne(id, {
      relations: ['package_image', 'packageTags', 'user', 'portfolios', 'user.user_address', 'user.user_avatar'],
    });
  }

  async findServicesById(id: string) {
    const data = await this.packageRepository.findOne({
      relations: ['services'],
      order: {
        updated_at: 'DESC',
      },
      where: {
        id,
        active: true,
      },
    });

    return data.services;
  }

  async findByUser(userId: string) {
    return this.packageRepository
      .createQueryBuilder('package')
      .leftJoinAndSelect('package.package_image', 'image')
      .leftJoinAndSelect('package.packageTags', 'tags')
      .leftJoinAndSelect('package.user', 'professional')
      .leftJoinAndSelect('professional.user_address', 'address')
      .leftJoinAndSelect('professional.user_avatar', 'avatar')
      .orderBy('package.updated_at', 'DESC')
      .where('professional.uuid = :userId', { userId })
      .andWhere('package.active = true')
      .getMany();
  }

  async update(id: string, updatePackageDto: UpdatePackageDto) {
    return this.packageRepository.update(id, updatePackageDto);
  }

  async findPaginatedResultsByUser(page: number, limit: number, userId: string) {
    const qb = this.packageRepository.createQueryBuilder('package');
    qb
      .leftJoinAndSelect('package.package_image', 'package_image')
      .leftJoinAndSelect('package.packageTags', 'portfolio_tags')
      .leftJoinAndSelect('package.portfolios', 'portfolios')
      .leftJoinAndSelect('package.user', 'user')
      .leftJoinAndSelect('user.user_avatar', 'user_avatar')
      .leftJoinAndSelect('user.user_address', 'user_address')
      .leftJoinAndSelect('user.specialty', 'specialty')
      .orderBy('package.updated_at', 'DESC')
      .where('package.active = true')
      .andWhere('user.uuid = :userId', { userId })
      .skip(page * limit)
      .take(limit)

    const nextPage = (await this.packageRepository.find({ skip: (page + 1) * limit, where: { user: userId } })).length > 0 ? 
    `/package/user/${userId}/page?page=${page + 1}&limit=${limit}` : undefined;

    const items = await qb.getMany();

    return {
      items,
      nextPage
    };
  }

  async remove(id: string) {
    return this.packageRepository.delete(id);
  }

  async addTagToPackage(packageId: string, tags: string[]) {
    const tagsArr = await this.packageTagRepository.findByIds(tags);

    const _package = await this.packageRepository.findOne(packageId, { relations: ['packageTags'] });

    _package.packageTags = [..._package.packageTags, ...tagsArr];

    return this.packageRepository.save(_package);
  }

  async removeTagFromPackage(packageId: string, tagId: string) {
    const _package = await this.packageRepository.findOne(packageId, { relations: ['packageTags'] });

    _package.packageTags = _package.packageTags.filter((tag) => tag.id !== tagId);

    await this.packageRepository.save(_package);
  }
}
