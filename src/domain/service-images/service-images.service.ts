import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import cloudinary from 'cloudinary';
import { Express } from 'express';
import { CreateServiceImageDto } from './dto/create-service-image.dto';
import { UpdateServiceImageDto } from './dto/update-service-image.dto';
import { ServiceImage } from './entities/service-image.entity';
import { Service } from '../service/entities/service.entity';

@Injectable()
export class ServiceImagesService {
  constructor(@InjectRepository(ServiceImage) private serviceImageRepository: Repository<ServiceImage>) {
    cloudinary.v2.config({
      cloud_name: 'artchapp',
      api_key: '419266759229973',
      api_secret: 'eeBWKaWmtcT0fy3_pfbgSmL6fxo',
      secure: true,
    });
  }

  async create(createServiceImageDto: CreateServiceImageDto) {
    return this.serviceImageRepository.save(createServiceImageDto);
  }

  async findAll() {
    return this.serviceImageRepository.find();
  }

  async findOne(id: string) {
    return this.serviceImageRepository.findOne(id);
  }

  async update(id: string, updateServiceImageDto: UpdateServiceImageDto) {
    return this.serviceImageRepository.update(id, updateServiceImageDto);
  }

  async remove(id: string) {
    return this.serviceImageRepository.delete(id);
  }

  async uploadImage(packageId: string, file: Express.Multer.File) {
    return cloudinary.v2.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      format: 'jpg',
    });
  }

  async updateUploadedImage(packageId: string, file: Express.Multer.File, public_id: string) {
    return cloudinary.v2.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      format: 'jpg',
      public_id,
    });
  }

  async getAllServiceImages(serviceId: string) {
    return this.serviceImageRepository.find({
      relations: ['service'],
      where: {
        service: serviceId,
      },
    });
  }

  async saveNewImage(_service: Service, ref: string, url: string, main: boolean, weight: number, description: string) {
    const serviceImage = new CreateServiceImageDto();
    serviceImage.service = _service;
    serviceImage.ref = ref;
    serviceImage.url = url;
    serviceImage.main = main;
    serviceImage.description = description || null;
    serviceImage.weight = weight;

    return this.serviceImageRepository.save(serviceImage);
  }

  async getOneImage(serviceId: string, imageId: string) {
    return this.serviceImageRepository.findOne({
      where: {
        id: imageId,
        service: serviceId,
      },
    });
  }

  async updateImage(id: string, url: string) {
    const serviceImage = new CreateServiceImageDto();

    serviceImage.url = url;

    return this.serviceImageRepository.update(
      {
        id,
      },
      serviceImage,
    );
  }

  async deleteImage(imageId: string, reference: string) {
    await cloudinary.v2.uploader.destroy(reference);
    await this.serviceImageRepository.delete({ id: imageId });
  }
}
