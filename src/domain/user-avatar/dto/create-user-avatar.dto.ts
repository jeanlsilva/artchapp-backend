import { UserBaseDTO } from '../../user/userBaseDTO';

export class CreateUserAvatarDto {
  uuid?: string;
  url: string;
  ref: string;
  weight: number;
  created_at?: Date;
  updated_at?: Date;
  user: UserBaseDTO;
}
