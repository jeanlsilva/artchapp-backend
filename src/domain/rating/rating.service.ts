import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(@InjectRepository(Rating) private ratingRepository: Repository<Rating>) {}

  async create(createRatingDto: CreateRatingDto) {
    return this.ratingRepository.save(createRatingDto);
  }

  async findAll() {
    return this.ratingRepository.find();
  }

  async findOne(id: string) {
    return this.ratingRepository.findOne(id);
  }

  async findByUser(user_id: string) {
    return this.ratingRepository.find({
      where: {
        user: user_id,
      },
    });
  }

  /*
  update(id: string, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: string) {
    return `This action removes a #${id} rating`;
  }
  */
}
