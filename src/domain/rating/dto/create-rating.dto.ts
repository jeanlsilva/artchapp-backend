import User from '../../user/user.entity';

export class CreateRatingDto {
  id?: string;
  rate: number;
  comment?: string;
  created_at?: Date;
  updated_at?: Date;

  // Relationships
  user: User;
}
