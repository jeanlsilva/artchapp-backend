import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from '../package/entities/package.entity';
import { PortfolioTag } from '../portfolio-tags/entities/portfolio-tag.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio) private portfolioRepository: Repository<Portfolio>,
    @InjectRepository(PortfolioTag) private portfolioTagRepository: Repository<PortfolioTag>,
    @InjectRepository(Package) private packageRepository: Repository<Package>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioRepository.save(createPortfolioDto);
  }

  async findAll() {
    return this.portfolioRepository.find({
      relations: [
        'packages',
        'packages.package_image',
        'portfolioTags',
        'portfolioImages',
        'user',
        'user.user_avatar',
        'user.user_address',
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
    const qb = this.portfolioRepository.createQueryBuilder('portfolio');
    qb
      .leftJoinAndSelect('portfolio.packages', 'packages')
      .leftJoinAndSelect('portfolio.portfolioImages', 'images')
      .leftJoinAndSelect('packages.package_image', 'package_image')
      .leftJoinAndSelect('portfolio.portfolioTags', 'portfolio_tags')
      .leftJoinAndSelect('portfolio.user', 'user')
      .leftJoinAndSelect('user.user_avatar', 'user_avatar')
      .leftJoinAndSelect('user.user_address', 'user_address')
      .orderBy('portfolio.updated_at', 'DESC')
      .where('portfolio.active = true')
      .skip(page * limit)
      .take(limit)
    
    const nextPage = (await this.portfolioRepository.find({ skip: (page + 1) * limit })).length > 0 ? 
    `/portfolio/page?page=${page + 1}&limit=${limit}` : undefined;

    const items = await qb.getMany();

    return {
      items,
      nextPage
    };
  }

  async find10Recents() {
    return this.portfolioRepository.find({
      relations: [
        'packages',
        'services',
        'packages.package_image',
        'portfolioImages',
        'portfolioTags',
        'user',
        'user.user_avatar',
        'user.user_address',
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
    return this.portfolioRepository.findOne(id, {
      relations: [
        'portfolioImages',
        'portfolioTags',
        'packages',
        'packages.package_image',
        'user',
        'user.user_avatar',
        'user.user_address',
      ],
      order: {
        updated_at: 'DESC',
      },
    });
  }

  async findByUser(userId: string) {
    return this.portfolioRepository.find({
      relations: [
        'services',
        'packages',
        'portfolioImages',
        'portfolioTags',
        'packages.package_image',
        'user',
        'user.user_avatar',
        'user.user_address',
      ],
      where: {
        user: userId,
        active: true,
      },
      order: {
        updated_at: 'DESC',
      },
    });
  }

  async findPaginatedResultsByUser(page: number, limit: number, userId: string) {
    const qb = this.portfolioRepository.createQueryBuilder('portfolio');
    qb
      .leftJoinAndSelect('portfolio.packages', 'packages')
      .leftJoinAndSelect('portfolio.portfolioImages', 'images')
      .leftJoinAndSelect('packages.package_image', 'package_image')
      .leftJoinAndSelect('portfolio.portfolioTags', 'portfolio_tags')
      .leftJoinAndSelect('portfolio.user', 'user')
      .leftJoinAndSelect('user.user_avatar', 'user_avatar')
      .leftJoinAndSelect('user.user_address', 'user_address')
      .orderBy('portfolio.updated_at', 'DESC')
      .where('portfolio.active = true')
      .andWhere('user.uuid = :userId', { userId })
      .skip(page * limit)
      .take(limit)

    const nextPage = (await this.portfolioRepository.find({ skip: (page + 1) * limit, where: { user: userId } })).length > 0 ? 
    `/portfolio/user/${userId}/page?page=${page + 1}&limit=${limit}` : undefined;

    const items = await qb.getMany();

    return {
      items,
      nextPage
    };
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto) {
    return this.portfolioRepository.update(id, updatePortfolioDto);
  }

  async remove(id: string) {
    return this.portfolioRepository.delete(id);
  }

  async addTagToPortfolio(portfolioId: string, tags: string[]) {
    const tagsArr = await this.portfolioTagRepository.findByIds(tags);

    const portfolio = await this.portfolioRepository.findOne(portfolioId, { relations: ['portfolioTags'] });

    portfolio.portfolioTags = [...portfolio.portfolioTags, ...tagsArr];

    return this.portfolioRepository.save(portfolio);
  }

  async removeTagFromPortfolio(portfolioId: string, tagId: string) {
    const portfolio = await this.portfolioRepository.findOne(portfolioId, { relations: ['portfolioTags'] });

    portfolio.portfolioTags = portfolio.portfolioTags.filter((tag) => tag.id !== tagId);

    await this.portfolioRepository.save(portfolio);
  }

  async addPackageToPortfolio(portfolioId: string, packages: string[]) {
    const packagesArr = await this.packageRepository.findByIds(packages);

    const portfolio = await this.portfolioRepository.findOne(portfolioId, { relations: ['packages'] });

    portfolio.packages = [...portfolio.packages, ...packagesArr];

    return this.portfolioRepository.save(portfolio);
  }

  async removePackageFromPortfolio(portfolioId: string, packageId: string) {
    const portfolio = await this.portfolioRepository.findOne(portfolioId, { relations: ['packages'] });

    portfolio.packages = portfolio.packages.filter((_package) => _package.id !== packageId);

    await this.portfolioRepository.save(portfolio);
  }
}
