import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import UserAddress from './entities/user-address.entity';

@Injectable()
export default class UserAddressService {
  constructor(@InjectRepository(UserAddress) private userAddressRepository: Repository<UserAddress>) {}

  public async create(createUserAddressDto: CreateUserAddressDto) {
    return this.userAddressRepository.save(createUserAddressDto);
  }

  public async findAll() {
    return this.userAddressRepository.find();
  }

  public async findOne(id: string) {
    return this.userAddressRepository.findOne(id);
  }

  public async findByUser(id: string) {
    return this.userAddressRepository.findOne({
      where: {
        user: id,
      },
    });
  }

  public async findCities() {
    const response = await this.userAddressRepository.find();
    const citiesSet = new Set(response.map((item) => item.city));
    const cities = [];
    citiesSet.forEach((city) => cities.push(city));
    return cities;
  }

  public async update(id: string, updateUserAddressDto: UpdateUserAddressDto) {
    return this.userAddressRepository.update(id, updateUserAddressDto);
  }

  public async remove(id: string) {
    return this.userAddressRepository.delete(id);
  }
}
