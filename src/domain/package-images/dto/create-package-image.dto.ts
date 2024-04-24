import { Package } from '../../package/entities/package.entity';

export class CreatePackageImageDto {
  id?: string;
  url: string;
  ref: string;
  main: boolean;
  weight: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;

  // Relationships
  package: Package;
}
