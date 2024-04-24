import User from '../../user/user.entity';
import { Service } from '../../service/entities/service.entity';
import { PackageImage } from 'src/domain/package-images/entities/package-image.entity';

export class CreatePackageDto {
  id?: string;
  slug: string;
  label: string;
  description?: string;
  active?: boolean;
  price: number;
  created_at?: Date;
  updated_at?: Date;
  stripe_price_id?: string;
  currency: string;

  // Relationships
  services: Service[];
  package_image: PackageImage;
  user: User;
}
