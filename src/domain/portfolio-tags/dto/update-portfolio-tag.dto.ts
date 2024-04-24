import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioTagDto } from './create-portfolio-tag.dto';

export class UpdatePortfolioTagDto extends PartialType(CreatePortfolioTagDto) {
  slug?: string;
  label?: string;
}
