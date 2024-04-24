import {
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserAvatarService } from './user-avatar.service';
import { AuthJwtGuard } from '../auth/auth.guard';
import { UserBaseDTO } from '../user/userBaseDTO';
import { UserService } from '../user/user.service';
import { UserAvatar } from './entities/user-avatar.entity';
import { Express } from 'express';
@Controller('user-avatar')
export class UserAvatarController {
  constructor(private readonly userAvatarService: UserAvatarService, private readonly userService: UserService) {}

  @UseGuards(AuthJwtGuard)
  @Get()
  async getAllAvatars() {
    return this.userAvatarService.getAllAvatars();
  }

  @UseGuards(AuthJwtGuard)
  @Get(':id')
  async getAvatar(@Param('id') imageId: string) {
    return this.userAvatarService.getAvatar(imageId);
  }

  @UseGuards(AuthJwtGuard)
  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Param('id') userId: string, @UploadedFile() file: Express.Multer.File) {
    try {
      const user: UserBaseDTO = await this.userService.getOne(userId);
      const uploaded = await this.userAvatarService.uploadAvatar(userId, file);
      const response = await this.userAvatarService.saveNewAvatar(user, uploaded.public_id, uploaded.url, 0);
      return response;
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

  @UseGuards(AuthJwtGuard)
  @Put(':id/image/:imageId')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @Param('id') userId: string,
    @Param('imageId') imageId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const avatar: UserAvatar = await this.userAvatarService.getAvatar(imageId);
      const uploaded = await this.userAvatarService.updateUploadedAvatar(imageId, file, avatar.ref);
      await this.userAvatarService.updateAvatar(imageId, uploaded.url);
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

  @UseGuards(AuthJwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/avatar/:imageId')
  async deleteAvatar(@Param('id') userId: string, @Param('imageId') imageId: string) {
    const avatar: UserAvatar = await this.userAvatarService.getAvatar(imageId);
    if (!avatar) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Ação inválida',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.userAvatarService.deleteAvatar(imageId, avatar.ref);
    }
  }
}
