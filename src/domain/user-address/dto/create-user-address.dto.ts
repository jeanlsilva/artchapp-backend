import User from '../../user/user.entity';

export class CreateUserAddressDto {
  uuid?: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  created_at?: Date;
  updated_at?: Date;
}
