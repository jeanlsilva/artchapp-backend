import { Portfolio } from '../../portfolio/entities/portfolio.entity';

export class CreatePortfolioImageDto {
  id?: string;
  url: string;
  ref: string;
  main: boolean;
  weight: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;

  // Relationships
  portfolio: Portfolio;
}
