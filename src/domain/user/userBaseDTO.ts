import { PartialType } from '@nestjs/mapped-types';
import { Board } from '../board/entities/board.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { Skill } from '../skill/entities/skill.entity';
import { Specialty } from '../specialty/entities/specialty.entity';
import UserAddress from '../user-address/entities/user-address.entity';
import { UserAvatar } from '../user-avatar/entities/user-avatar.entity';
import UserType from './userType.entity';

export class UserBaseDTO {
  uuid?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  description?: string;
  firebase_uid?: string;
  vat_number?: string;
  stripe_id?: string;
  created_at?: Date;
  updated_at?: Date;
  locale?: string;

  // Relationships
  role: UserType;
  specialty: Specialty;
  board: Board;
  user_avatar?: UserAvatar;
  user_address?: UserAddress;
  skills?: Skill[];
  portfolios?: Portfolio[];
}

export class UserUpdateDTO extends PartialType(UserBaseDTO) {
  email?: string;
  name?: string;
  password?: string;
  phone?: string;
  role?: UserType;
  specialty?: Specialty;
  board?: Board;
}

export class LoggedUserRequest {
  userId: string;
  role: UserType;
}
