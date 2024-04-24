import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageImageDto } from './create-package-image.dto';

export class UpdatePackageImageDto extends PartialType(CreatePackageImageDto) {
  url?: string;
}
