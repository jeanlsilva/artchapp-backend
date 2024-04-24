import { Test, TestingModule } from '@nestjs/testing';
import { ServiceImagesService } from './service-images.service';

describe('ServiceImagesService', () => {
  let service: ServiceImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceImagesService],
    }).compile();

    service = module.get<ServiceImagesService>(ServiceImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
