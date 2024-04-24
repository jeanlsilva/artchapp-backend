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
import { Multer} from 'multer';
import { PortfolioImagesService } from './portfolio-image.service';
import { CreatePortfolioImageDto } from './dto/create-portfolio-image.dto';
import { UpdatePortfolioImageDto } from './dto/update-portfolio-image.dto';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { PortfolioService } from '../portfolio/portfolio.service';
import { PortfolioImage } from './entities/portfolio-image.entity';

@Controller('portfolio-image')
export class PortfolioImageController {
  constructor(
    private readonly portfolioImageService: PortfolioImagesService,
    private readonly portfolioService: PortfolioService,
  ) {}

  @Post()
  create(@Body() createPortfolioImageDto: CreatePortfolioImageDto) {
    return this.portfolioImageService.create(createPortfolioImageDto);
  }

  @Get()
  findAll() {
    return this.portfolioImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioImageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortfolioImageDto: UpdatePortfolioImageDto) {
    return this.portfolioImageService.update(id, updatePortfolioImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioImageService.remove(id);
  }

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('id') portfolioId: string, @UploadedFile() file: Express.Multer.File) {
    try {
      const portfolio: Portfolio = await this.portfolioService.findOne(portfolioId);
      const images: PortfolioImage[] = await this.portfolioImageService.getAllPortfolioImages(portfolioId);
      const uploaded = await this.portfolioImageService.uploadImage(portfolioId, file);
      return this.portfolioImageService.saveNewImage(
        portfolio,
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
    @Param('id') portfolioId: string,
    @Param('imageId') imageId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const image: PortfolioImage = await this.portfolioImageService.getOneImage(portfolioId, imageId);
      const uploaded = await this.portfolioImageService.updateUploadedImage(portfolioId, file, image.ref);
      await this.portfolioImageService.updateImage(imageId, uploaded.url);
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
  async deleteImage(@Param('id') portfolioId: string, @Param('imageId') imageId: string) {
    const image: PortfolioImage = await this.portfolioImageService.getOneImage(portfolioId, imageId);
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
      await this.portfolioImageService.deleteImage(imageId, image.ref);
    }
  }
}
