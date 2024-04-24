import { Service } from '../../service/entities/service.entity';

export class CreateServiceImageDto {
  id?: string;
  url: string;
  ref: string;
  main: boolean;
  weight: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;

  // Relationships
  service: Service;
}
