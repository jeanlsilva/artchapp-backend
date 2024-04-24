import { Test, TestingModule } from '@nestjs/testing';
import { PackageTagsController } from './package-tags.controller';
import { PackageTagsService } from './package-tags.service';

describe('PackageTagsController', () => {
  let controller: PackageTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageTagsController],
      providers: [PackageTagsService],
    }).compile();

    controller = module.get<PackageTagsController>(PackageTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
