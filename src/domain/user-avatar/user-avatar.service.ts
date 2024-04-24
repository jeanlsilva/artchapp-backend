import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import cloudinary from 'cloudinary';
import { Express } from 'express';
import { CreateUserAvatarDto } from './dto/create-user-avatar.dto';
import { UpdateUserAvatarDto } from './dto/update-user-avatar.dto';
import { UserAvatar } from './entities/user-avatar.entity';
import { UserBaseDTO } from '../user/userBaseDTO';

@Injectable()
export class UserAvatarService {
  constructor(@InjectRepository(UserAvatar) private userAvatarRepository: Repository<UserAvatar>) {
    cloudinary.v2.config({
      cloud_name: 'artchapp',
      api_key: '419266759229973',
      api_secret: 'eeBWKaWmtcT0fy3_pfbgSmL6fxo',
    });
  }

  async getAllAvatars() {
    return this.userAvatarRepository.find();
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    return cloudinary.v2.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      format: 'jpg',
    });
  }

  async updateUploadedAvatar(userId: string, file: Express.Multer.File, public_id: string) {
    return cloudinary.v2.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      format: 'jpg',
      public_id,
    });
  }

  saveNewAvatar(user: UserBaseDTO, ref: string, url: string, weight: number) {
    const userAvatarDto = new CreateUserAvatarDto();
    userAvatarDto.ref = ref;
    userAvatarDto.url = url;
    userAvatarDto.weight = weight;
    userAvatarDto.user = user;

    return this.userAvatarRepository.save(userAvatarDto);
  }

  async getAvatar(imageId: string) {
    return this.userAvatarRepository.findOne({ uuid: imageId });
  }

  async updateAvatar(imageId: string, url: string) {
    const userAvatarDto = new UpdateUserAvatarDto();
    userAvatarDto.url = url;

    return this.userAvatarRepository.update({ uuid: imageId }, userAvatarDto);
  }

  async deleteAvatar(imageId: string, reference: string) {
    await cloudinary.v2.uploader.destroy(reference);

    await this.userAvatarRepository.delete({ uuid: imageId });
  }
}
