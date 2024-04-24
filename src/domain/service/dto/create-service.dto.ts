import { ServiceTag } from '../../service-tags/entities/service-tag.entity';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';

export class CreateServiceDto {
  uuid?: string;
  slug: string;
  label: string;
  price: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;

  // Relationships
  portfolio: Portfolio;
  service_tags?: ServiceTag[];
}
