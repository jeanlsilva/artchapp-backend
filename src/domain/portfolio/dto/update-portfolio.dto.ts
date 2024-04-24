import { PartialType } from '@nestjs/mapped-types';
import User from '../../user/user.entity';
import { CreatePortfolioDto } from './create-portfolio.dto';

export class UpdatePortfolioDto extends PartialType(CreatePortfolioDto) {
  name?: string;
  user?: User;
}
