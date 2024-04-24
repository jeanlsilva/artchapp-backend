import { Package } from '../../package/entities/package.entity';
import { PortfolioImage } from '../../portfolio-image/entities/portfolio-image.entity';
import User from '../../user/user.entity';

export class CreatePortfolioDto {
  id?: string;
  name: string;
  description?: string;
  active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  // Relationships
  packages: Package[];
  portfolioImages?: PortfolioImage;
  user: User;
}
