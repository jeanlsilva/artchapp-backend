import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(@InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const { title, payment_method, delivery_address, finished, total, package: type, user, size } = createPurchaseDto;

    return this.purchaseRepository.save({
      title,
      payment_method,
      delivery_address,
      total,
      package: type,
      user,
      finished,
      size,
    });
  }

  async findAll() {
    return this.purchaseRepository.find();
  }

  async findOne(id: string) {
    return this.purchaseRepository.findOne(id, {
      relations: [
        'package',
        'package.user',
        'package.user.user_avatar',
        'package.user.user_address',
        'user',
        'user.user_avatar',
        'user.user_address',
      ],
    });
  }

  async findByUser(userId: string) {
    return this.purchaseRepository.find({
      relations: ['package', 'user', 'user.user_address', 'user.user_avatar'],
      where: {
        user: userId,
      },
      order: {
        updated_at: 'DESC',
      },
    });
  }

  async findByProfessional(professionalId: string) {
    return this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.package', 'package')
      .leftJoinAndSelect('package.user', 'professional')
      .leftJoinAndSelect('purchase.user', 'user')
      .where('professional.uuid = :professionalId', { professionalId })
      .orderBy('purchase.updated_at', 'DESC')
      .getMany();
  }

  /* async findPackagesById(id: string) {
    const data = await this.purchaseRepository.findOne(id, {
      relations: ['packages'],
    });

    return data.packages;
  } */

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseRepository.update(id, updatePurchaseDto);
  }

  async remove(id: string) {
    return this.purchaseRepository.delete(id);
  }
}
