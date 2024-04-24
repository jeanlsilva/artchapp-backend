import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAddressDto } from './create-user-address.dto';

export class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {
  first_line?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
}
