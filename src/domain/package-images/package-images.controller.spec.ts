import { Test, TestingModule } from '@nestjs/testing';
import { PackageImagesController } from './package-images.controller';
import { PackageImagesService } from './package-images.service';

describe('PackageImagesController', () => {
  let controller: PackageImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageImagesController],
      providers: [PackageImagesService],
    }).compile();

    controller = module.get<PackageImagesController>(PackageImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
