import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceImageDto } from './create-service-image.dto';

export class UpdateServiceImageDto extends PartialType(CreateServiceImageDto) {
  url?: string;
}
