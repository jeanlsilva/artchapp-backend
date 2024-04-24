import { Test, TestingModule } from '@nestjs/testing';
import { PackageTagsService } from './package-tags.service';

describe('PackageTagsService', () => {
  let service: PackageTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageTagsService],
    }).compile();

    service = module.get<PackageTagsService>(PackageTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
