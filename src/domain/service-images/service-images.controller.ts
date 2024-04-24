import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ServiceImagesService } from './service-images.service';
import { CreateServiceImageDto } from './dto/create-service-image.dto';
import { UpdateServiceImageDto } from './dto/update-service-image.dto';
import { ServiceService } from '../service/service.service';
import { Service } from '../service/entities/service.entity';
import { ServiceImage } from './entities/service-image.entity';

@Controller('service-images')
export class ServiceImagesController {
  constructor(
    private readonly serviceImagesService: ServiceImagesService,
    private readonly serviceService: ServiceService,
  ) {}

  @Post()
  create(@Body() createServiceImageDto: CreateServiceImageDto) {
    return this.serviceImagesService.create(createServiceImageDto);
  }

  @Get()
  findAll() {
    return this.serviceImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceImagesService.findOne(id);
  }

  @Get(':id/service')
  findServiceImages(@Param('id') serviceId: string) {
    return this.serviceImagesService.getAllServiceImages(serviceId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceImageDto: UpdateServiceImageDto) {
    return this.serviceImagesService.update(id, updateServiceImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceImagesService.remove(id);
  }

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('id') serviceId: string, @UploadedFile() file: Express.Multer.File) {
    try {
      const service: Service = await this.serviceService.findOne(serviceId);
      const images: ServiceImage[] = await this.serviceImagesService.getAllServiceImages(serviceId);
      const uploaded = await this.serviceImagesService.uploadImage(serviceId, file);
      return this.serviceImagesService.saveNewImage(
        service,
        uploaded.public_id,
        uploaded.url,
        images.length === 0,
        0,
        `image ref ${uploaded.public_id}`,
      );
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id/image/:imageId')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @Param('id') packageId: string,
    @Param('imageId') imageId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const image: ServiceImage = await this.serviceImagesService.getOneImage(packageId, imageId);
      const uploaded = await this.serviceImagesService.updateUploadedImage(packageId, file, image.ref);
      await this.serviceImagesService.updateImage(imageId, uploaded.url);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id/image/:imageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteImage(@Param('id') packageId: string, @Param('imageId') imageId: string) {
    const image: ServiceImage = await this.serviceImagesService.getOneImage(packageId, imageId);
    if (!image) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid action',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      if (image.main) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Unable to delete main image!',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.serviceImagesService.deleteImage(imageId, image.ref);
    }
  }
}
