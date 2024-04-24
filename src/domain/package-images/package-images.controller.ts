import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
  Injectable,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { PackageImagesService } from './package-images.service';
import { CreatePackageImageDto } from './dto/create-package-image.dto';
import { UpdatePackageImageDto } from './dto/update-package-image.dto';
import { Package } from '../package/entities/package.entity';
import { PackageService } from '../package/package.service';
import { PackageImage } from './entities/package-image.entity';

@Controller('package-images')
@Injectable()
export class PackageImagesController {
  constructor(
    private readonly packageImagesService: PackageImagesService,
    private readonly packageService: PackageService,
  ) {}

  @Post()
  create(@Body() createPackageImageDto: CreatePackageImageDto) {
    return this.packageImagesService.create(createPackageImageDto);
  }

  @Get()
  findAll() {
    return this.packageImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageImagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageImageDto: UpdatePackageImageDto) {
    return this.packageImagesService.update(id, updatePackageImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageImagesService.remove(id);
  }

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('id') packageId: string, @UploadedFile() file: Express.Multer.File) {
    try {
      const _package: Package = await this.packageService.findOne(packageId);
      const images: PackageImage[] = await this.packageImagesService.getAllPackageImages(packageId);
      const uploaded = await this.packageImagesService.uploadImage(packageId, file);
      return this.packageImagesService.saveNewImage(
        _package,
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
      const image: PackageImage = await this.packageImagesService.getOneImage(packageId, imageId);
      const uploaded = await this.packageImagesService.updateUploadedImage(packageId, file, image.ref);
      await this.packageImagesService.updateImage(imageId, uploaded.url);
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
    const image: PackageImage = await this.packageImagesService.getOneImage(packageId, imageId);
    if (!image) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid action',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      /*if (image.main) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Unable to delete main image!',
          },
          HttpStatus.BAD_REQUEST,
        );
      }*/
      await this.packageImagesService.deleteImage(imageId, image.ref);
    }
  }
}
