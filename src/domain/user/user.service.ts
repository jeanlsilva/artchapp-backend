import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FirebaseService } from '../firebase/firebase.service';
import { PackageImagesService } from '../package-images/package-images.service';
import { PackageService } from '../package/package.service';
import { PortfolioImagesService } from '../portfolio-image/portfolio-image.service';
import { PortfolioService } from '../portfolio/portfolio.service';
import { PurchaseService } from '../purchase/purchase.service';
import { Skill } from '../skill/entities/skill.entity';
import User from './user.entity';
import { UserBaseDTO, UserUpdateDTO } from './userBaseDTO';
import UserType from './userType.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserType) private userTypeRepository: Repository<UserType>,
    @InjectRepository(Skill) private skillsRepository: Repository<Skill>,
    private readonly purchaseService: PurchaseService,
    private readonly packageService: PackageService,
    private readonly packageImageService: PackageImagesService,
    private readonly portfolioService: PortfolioService,
    private readonly portfolioImageService: PortfolioImagesService,
    private readonly firebaseService: FirebaseService
  ) {}

  public async createNewUser(createUserRequest: UserBaseDTO) {
    const role = await this.userTypeRepository.findOne({ slug: createUserRequest.role.slug });
    const user: User = new User();
    user.name = createUserRequest.name;
    user.email = createUserRequest.email;
    user.password = createUserRequest.password;
    user.phone = createUserRequest.phone;
    user.vat_number = createUserRequest.vat_number;
    user.firebase_uid = createUserRequest.firebase_uid;
    user.user_address = createUserRequest.user_address;
    user.role = role;

    await this.userRepository.save(user);
    return UserService.userToDTO(user);
  }

  private static userToDTO(user: User): UserBaseDTO {
    const userDTO = new UserBaseDTO();
    userDTO.uuid = user.uuid;
    userDTO.name = user.name;
    userDTO.phone = user.phone;
    userDTO.email = user.email;
    userDTO.description = user.description;
    userDTO.password = user.password;
    userDTO.vat_number = user.vat_number;
    userDTO.stripe_id = user.stripe_id;
    userDTO.role = user.role;
    userDTO.firebase_uid = user.firebase_uid;
    userDTO.created_at = user.created_at;
    userDTO.updated_at = user.updated_at;
    userDTO.skills = user.skills;
    userDTO.user_address = user.user_address;
    userDTO.user_avatar = user.user_avatar;
    userDTO.portfolios = user.portfolios;
    return userDTO;
  }

  public async getAllUsers() {
    /* const users: User[] = await this.userRepository.find({
      relations: ['user_address', 'user_avatar'],
    }); */
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.user_address', 'address')
      .leftJoinAndSelect('user.user_avatar', 'avatar');

    const users = await query.getMany();

    return users.map((user) => UserService.userToDTO(user));
  }

  public async getAllProfessionals() {
    const role = await this.userTypeRepository.findOne({
      where: {
        slug: 'admin',
      },
    });

    const users: User[] = await this.userRepository.find({
      relations: ['specialty', 'user_address', 'skills', 'user_avatar'],
      where: {
        role: role.uuid,
      },
    });

    return users;
  }

  public async getLast10RecentProfessionals() {
    const role = await this.userTypeRepository.findOne({
      where: {
        slug: 'admin',
      },
    });

    const users: User[] = await this.userRepository.find({
      relations: ['specialty', 'user_address', 'skills', 'user_avatar'],
      where: {
        role: role.uuid,
      },
      take: 10,
    });

    return users;
  }

  public async getOneProfessional(professionalId: string) {
    const user: User = await this.userRepository.findOne({
      relations: ['specialty', 'user_address', 'portfolios', 'portfolios.services', 'skills', 'user_avatar'],
      where: {
        uuid: professionalId,
      },
    });

    return user;
  }

  public async getOne(userId: string) {
    return UserService.userToDTO(
      await this.userRepository.findOne(userId, {
        relations: [
          'user_address',
          'role',
          'user_avatar',
          'skills',
          'portfolios',
          'portfolios.services',
          'portfolios.services.service_image',
          'portfolios.user',
        ],
      }),
    );
  }

  async updateUser(userId: number, updateUserRequest: UserUpdateDTO) {
    await this.userRepository.update(userId, updateUserRequest);
    return UserService.userToDTO(await this.userRepository.findOne(userId));
  }

  async addSkillsToUser(userId: string, skills: Skill[]) {
    const skillsArr = await this.skillsRepository.findByIds(skills);

    const user = await this.userRepository.findOne(userId, { relations: ['skills'] });

    user.skills = [...user.skills, ...skillsArr];

    return this.userRepository.save(user);
  }

  async removeSkillFromUser(userId: string, skillId: string) {
    const user = await this.userRepository.findOne(userId, { relations: ['skills'] });

    user.skills = user.skills.filter((skill) => skill.id !== skillId);

    return this.userRepository.save(user);
  }

  async deleteUser(userId: number | string) {
    const user = await this.userRepository.findOne(userId);
    await this.firebaseService.deleteUser(user.firebase_uid);
    return this.userRepository.delete(userId);
  }

  async deleteProfessionalOrders(professionalId) {
    const purchases = await this.purchaseService.findByProfessional(professionalId);
    if (purchases.length > 0) {
      purchases.forEach(async (purchase) => await this.purchaseService.remove(purchase.id));
    }
  }

  async deleteProfessionalPackages(professionalId) {
    const packages = await this.packageService.findByUser(professionalId);
    if (packages.length > 0) {
      packages.forEach(async (_package) => {
        if (_package.package_image) {
          const image = await this.packageImageService.getOneImage(_package.id, _package.package_image.id);
          await this.packageService.update(_package.id, { package_image: null });
          await this.packageImageService.deleteImage(image.id, image.ref);
        }
        await this.packageService.remove(_package.id);
      });
    }
  }

  async deleteProfessionalPortfolios(professionalId) {
    const portfolios = await this.portfolioService.findByUser(professionalId);
    if (portfolios.length > 0) {
      portfolios.forEach(async (portfolio) => {
        if (portfolio.portfolioImages) {            
          const image = await this.portfolioImageService.getOneImage(portfolio.id, portfolio.portfolioImages.id);
          await this.portfolioService.update(portfolio.id, { portfolioImages: null });
          await this.portfolioImageService.deleteImage(image.id, image.ref);          
        }
        await this.portfolioService.remove(portfolio.id);
      });
    }
  }

  async deleteProfessional(professionalId: string) {
    await this.deleteProfessionalOrders(professionalId);
    await this.deleteProfessionalPackages(professionalId);
    await this.deleteProfessionalPortfolios(professionalId);
  }

  async getByFirebaseUid(uid: string) {
    return this.userRepository.findOne(
      {
        firebase_uid: uid,
      },
      {
        relations: ['role', 'user_address', 'user_avatar', 'portfolios', 'portfolios.services', 'skills'],
      },
    );
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne(
      { email },
      {
        relations: ['role', 'user_address', 'user_avatar', 'portfolios', 'portfolios.services', 'skills'],
      },
    );
  }
}
