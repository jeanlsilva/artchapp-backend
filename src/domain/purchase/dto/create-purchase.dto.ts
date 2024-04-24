import { Package } from '../../package/entities/package.entity';
import User from '../../user/user.entity';

export class CreatePurchaseDto {
  id?: string;
  payment_method: string;
  delivery_address?: string;
  title: string;
  finished: boolean;
  total: number;
  created_at?: Date;
  updated_at?: Date;
  package: Package;
  size: number;

  // Relationships
  user: User;
}
