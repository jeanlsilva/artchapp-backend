import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTagsService } from './service-tags.service';

describe('ServiceTagsService', () => {
  let service: ServiceTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceTagsService],
    }).compile();

    service = module.get<ServiceTagsService>(ServiceTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
