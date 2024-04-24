import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioImageDto } from './create-portfolio-image.dto';

export class UpdatePortfolioImageDto extends PartialType(CreatePortfolioImageDto) {
  url?: string;
}
