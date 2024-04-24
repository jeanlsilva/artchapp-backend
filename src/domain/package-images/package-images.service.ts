import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import cloudinary from 'cloudinary';
import { Express } from 'express';
import { CreatePackageImageDto } from './dto/create-package-image.dto';
import { UpdatePackageImageDto } from './dto/update-package-image.dto';
import { PackageImage } from './entities/package-image.entity';
import { Package } from '../package/entities/package.entity';

@Injectable()
export class PackageImagesService {
  constructor(@InjectRepository(PackageImage) private packageImageRepository: Repository<PackageImage>) {
    cloudinary.v2.config({
      cloud_name: 'artchapp',
      api_key: '419266759229973',
      api_secret: 'eeBWKaWmtcT0fy3_pfbgSmL6fxo',
      secure: true,
    });
  }

  async create(createPackageImageDto: CreatePackageImageDto) {
    return this.packageImageRepository.save(createPackageImageDto);
  }

  async findAll() {
    return this.packageImageRepository.find();
  }

  async findOne(id: string) {
    return this.packageImageRepository.findOne(id);
  }

  async update(id: string, updatePackageImageDto: UpdatePackageImageDto) {
    return this.packageImageRepository.update(id, updatePackageImageDto);
  }

  async remove(id: string) {
    return this.packageImageRepository.delete(id);
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

  async getAllPackageImages(packageId: string) {
    return this.packageImageRepository.find({
      where: {
        id: packageId,
      },
    });
  }

  async saveNewImage(_package: Package, ref: string, url: string, main: boolean, weight: number, description: string) {
    const packageImage = new CreatePackageImageDto();
    packageImage.package = _package;
    packageImage.ref = ref;
    packageImage.url = url;
    packageImage.main = main;
    packageImage.description = description || null;
    packageImage.weight = weight;

    return this.packageImageRepository.save(packageImage);
  }

  async getOneImage(packageId: string, imageId: string) {
    return this.packageImageRepository.findOne({
      where: {
        id: imageId,
        package: packageId,
      },
    });
  }

  async updateImage(id: string, url: string) {
    const packageImage = new CreatePackageImageDto();

    packageImage.url = url;

    return this.packageImageRepository.update(
      {
        id,
      },
      packageImage,
    );
  }

  async deleteImage(imageId: string, reference: string) {
    await cloudinary.v2.uploader.destroy(reference);
    await this.packageImageRepository.delete({ id: imageId });
  }
}
