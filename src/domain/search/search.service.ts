import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from '../package/entities/package.entity';
import UserAddress from '../user-address/entities/user-address.entity';
import User from '../user/user.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserAddress) private userAddressRepository: Repository<UserAddress>,
    @InjectRepository(Package) private packageRepository: Repository<Package>,
  ) {}

  async professionalsByCity(city: string) {
    const users = this.userRepository
      .createQueryBuilder('user')
      .where('address.city = :city', { city })
      .leftJoinAndSelect('user.user_address', 'address')
      .leftJoinAndSelect('user.user_avatar', 'avatar')
      .leftJoinAndSelect('user.specialty', 'specialty')
      .leftJoinAndSelect('user.portfolios', 'portfolios')
      .leftJoinAndSelect('user.skills', 'skills')
      .getMany();

    return users;
  }

  async professionalsBySpecialty(specialty: string, skills: string[]) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.specialty', 'specialty')
      .leftJoinAndSelect('user.user_avatar', 'avatar')
      .leftJoinAndSelect('user.user_address', 'address')
      .leftJoin('user.skills', 'skill');

    if (specialty) {
      query.where('specialty.slug = :specialty', { specialty });
    }

    if (skills.length > 0) {
      query
        .addSelect('COUNT(skill.slug)')
        .andWhere('skill.slug IN (:...skills)', { skills })
        .groupBy('user.uuid, specialty.id, avatar.uuid, address.uuid')
        .having('COUNT(skill.slug) = :count', { count: skills.length });
    }

    const results = await query.getMany();

    const users = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.specialty', 'specialty')
      .leftJoinAndSelect('user.user_avatar', 'avatar')
      .leftJoinAndSelect('user.user_address', 'address')
      .leftJoinAndSelect('user.skills', 'skill')
      .whereInIds(results.map((result) => result.uuid));

    return users.getMany();
  }

  async findPackagesByPortfolios(portfolios: string[]) {
    if (portfolios.length > 0) {
      const query = this.packageRepository
        .createQueryBuilder('package')
        .leftJoinAndSelect('package.package_image', 'image')
        .leftJoinAndSelect('package.services', 'services')
        .leftJoinAndSelect('services.portfolio', 'portfolio')
        .leftJoinAndSelect('portfolio.user', 'user')
        .where('portfolio.id = :portfolio', { portfolio: portfolios[0] })
        .andWhere('package.active = true');

      if (portfolios.length > 1) {
        portfolios.shift();
        portfolios.map((portfolio) => query.orWhere('portfolio.id = :portfolio1', { portfolio1: portfolio }));
      }

      return query.getMany();
    }
    return [];
  }
}
