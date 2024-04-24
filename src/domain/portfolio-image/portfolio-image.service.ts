import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import cloudinary from 'cloudinary';
import { Express } from 'express';
import { CreatePortfolioImageDto } from './dto/create-portfolio-image.dto';
import { UpdatePortfolioImageDto } from './dto/update-portfolio-image.dto';
import { PortfolioImage } from './entities/portfolio-image.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';

@Injectable()
export class PortfolioImagesService {
  constructor(@InjectRepository(PortfolioImage) private portfolioImageRepository: Repository<PortfolioImage>) {
    cloudinary.v2.config({
      cloud_name: 'artchapp',
      api_key: '419266759229973',
      api_secret: 'eeBWKaWmtcT0fy3_pfbgSmL6fxo',
      secure: true,
    });
  }

  async create(createPortfolioImageDto: CreatePortfolioImageDto) {
    return this.portfolioImageRepository.save(createPortfolioImageDto);
  }

  async findAll() {
    return this.portfolioImageRepository.find();
  }

  async findOne(id: string) {
    return this.portfolioImageRepository.findOne(id);
  }

  async update(id: string, updatePortfolioImageDto: UpdatePortfolioImageDto) {
    return this.portfolioImageRepository.update(id, updatePortfolioImageDto);
  }

  async remove(id: string) {
    return this.portfolioImageRepository.delete(id);
  }

  async uploadImage(portfolioId: string, file: Express.Multer.File) {
    return cloudinary.v2.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      format: 'jpg',
    });
  }

  async updateUploadedImage(portfolioId: string, file: Express.Multer.File, public_id: string) {
    return cloudinary.v2.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      format: 'jpg',
      public_id,
    });
  }

  async getAllPortfolioImages(portfolioId: string) {
    return this.portfolioImageRepository.find({
      where: {
        id: portfolioId,
      },
    });
  }

  async saveNewImage(
    portfolio: Portfolio,
    ref: string,
    url: string,
    main: boolean,
    weight: number,
    description: string,
  ) {
    const portfolioImage = new CreatePortfolioImageDto();
    portfolioImage.portfolio = portfolio;
    portfolioImage.ref = ref;
    portfolioImage.url = url;
    portfolioImage.main = main;
    portfolioImage.description = description || null;
    portfolioImage.weight = weight;

    return this.portfolioImageRepository.save(portfolioImage);
  }

  async getOneImage(portfolioId: string, imageId: string) {
    return this.portfolioImageRepository.findOne({
      where: {
        id: imageId,
        portfolio: portfolioId,
      },
    });
  }

  async updateImage(id: string, url: string) {
    const portfolioImage = new CreatePortfolioImageDto();

    portfolioImage.url = url;

    return this.portfolioImageRepository.update(
      {
        id,
      },
      portfolioImage,
    );
  }

  async deleteImage(imageId: string, reference: string) {
    await cloudinary.v2.uploader.destroy(reference);
    await this.portfolioImageRepository.delete({ id: imageId });
  }
}
