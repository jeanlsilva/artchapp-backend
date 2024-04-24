import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageTagDto } from './create-package-tag.dto';

export class UpdatePackageTagDto extends PartialType(CreatePackageTagDto) {
  slug?: string;
  label?: string;
}
