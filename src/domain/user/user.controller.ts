import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggedUserRequest, UserBaseDTO, UserUpdateDTO } from './userBaseDTO';
import { UserService } from './user.service';
import { AuthJwtGuard } from '../auth/auth.guard';
import { FirebaseService } from '../firebase/firebase.service';
import { Roles } from '../auth/auth.role.decorator';
import { RoleGuard } from '../auth/auth.role.guard';
import { User } from './user.decorator';
import { UserEventsEnum } from './user.events';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly firebaseService: FirebaseService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get('/')
  public async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Roles('admin')
  @UseGuards(AuthJwtGuard, RoleGuard)
  @Get('/all')
  public async getAll() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthJwtGuard)
  @Get('me')
  async getSelf(@User() user: LoggedUserRequest) {
    const loggedUser = await this.userService.getOne(user.userId);
    // const userAvatar = await this.userService.getUserAvatar(user.uuid);
    return loggedUser;
  }

  @Get('/professionals')
  findAllProfessionals() {
    return this.userService.getAllProfessionals();
  }

  @Get('/professionals/recent')
  findRecentProfessionals() {
    return this.userService.getLast10RecentProfessionals();
  }

  @Get('/professionals/:id')
  findOneProfessional(@Param('id') professionalId: string) {
    return this.userService.getOneProfessional(professionalId);
  }

  @Roles('admin')
  @UseGuards(AuthJwtGuard, RoleGuard)
  @Get('/:id')
  public async getOne(@Param('id') userId: string) {
    return this.userService.getOne(userId);
  }

  @UseGuards(AuthJwtGuard)
  @Get()
  public async getSelfUser(@Request() req) {
    return this.userService.getOne(req.user.userId);
  }

  @Post()
  public async createNewUser(@Body() createUserRequest: UserBaseDTO) {
    const firebaseUser = await this.firebaseService.createUser(createUserRequest);
    if (firebaseUser === 'auth/email-already-exists') {
      return {
        success: false,
        error: 'Email already exists',
      };
    } else if (firebaseUser === 'auth/invalid-password') {
      return {
        success: false,
        error: 'Invalid password'
      }
    } else if (firebaseUser === 'auth/invalid-phone-number') {
      return {
        success: false,
        error: 'Invalid phone number'
      }
    } else if (firebaseUser === 'auth/phone-number-already-exists') {
      return {
        success: false,
        error: 'Phone number already exists'
      }
    }
    
    createUserRequest.firebase_uid = firebaseUser.uid;

    const createUser = await this.userService.createNewUser(createUserRequest);
    this.eventEmitter.emit(UserEventsEnum.CREATED, createUser);
    return createUser;
  }

  @Put('/:id')
  public async updateUser(@Param('id') userId: number, @Body() updateUserRequest: UserUpdateDTO) {
    return this.userService.updateUser(userId, updateUserRequest);
  }

  @UseGuards(AuthJwtGuard, RoleGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(@Param('id') userId: number) {
    await this.userService.deleteUser(userId);
  }

  @Post('/:id/skills')
  public async addSkillToUser(@Param('id') userId: string, @Body() { skills }) {
    return this.userService.addSkillsToUser(userId, skills);
  }

  @Delete('/:id/skills/:skillId')
  public async removeSkillFromUser(@Param('id') userId: string, @Param('skillId') skillId: string) {
    return this.userService.removeSkillFromUser(userId, skillId);
  }

  @Delete('/professionals/:id')
  public async deleteProfessional(@Param('id') professionalId: string) {
    try {
      return this.userService.deleteProfessional(professionalId);
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
