import { Test, TestingModule } from '@nestjs/testing';
import { PackageImagesService } from './package-images.service';

describe('PackageImagesService', () => {
  let service: PackageImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageImagesService],
    }).compile();

    service = module.get<PackageImagesService>(PackageImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
