import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { CreatePortfolioTagDto } from './dto/create-portfolio-tag.dto';
import { UpdatePortfolioTagDto } from './dto/update-portfolio-tag.dto';
import { PortfolioTag } from './entities/portfolio-tag.entity';

@Injectable()
export class PortfolioTagsService {
  constructor(
    @InjectRepository(PortfolioTag) private portfolioTagRepository: Repository<PortfolioTag>,
    @InjectRepository(Portfolio) private portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(createPortfolioTagDto: CreatePortfolioTagDto) {
    return this.portfolioTagRepository.save(createPortfolioTagDto);
  }

  async findAll() {
    return this.portfolioTagRepository.find();
  }

  async findOne(id: string) {
    return this.portfolioTagRepository.findOne(id);
  }

  async update(id: string, updatePortfolioTagDto: UpdatePortfolioTagDto) {
    return this.portfolioTagRepository.update(id, updatePortfolioTagDto);
  }

  async remove(id: string) {
    return this.portfolioTagRepository.delete(id);
  }

  async addTagToPortfolio(portfolioId: string, tags: string[]) {
    const tagsArr = await this.portfolioTagRepository.findByIds(tags);

    const portfolio = await this.portfolioRepository.findOne(portfolioId, { relations: ['portfolioTags'] });

    portfolio.portfolioTags = [...portfolio.portfolioTags, ...tagsArr];

    return this.portfolioRepository.save(portfolio);
  }

  async removeTagFromPackage(portfolioId: string, tagId: string) {
    const portfolio = await this.portfolioRepository.findOne(portfolioId, { relations: ['portfolioTags'] });

    portfolio.portfolioTags = portfolio.portfolioTags.filter((tag) => tag.id !== tagId);

    await this.portfolioRepository.save(portfolio);
  }
}
