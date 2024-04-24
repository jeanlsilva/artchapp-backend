import { Test, TestingModule } from '@nestjs/testing';
import { ServiceImagesController } from './service-images.controller';
import { ServiceImagesService } from './service-images.service';

describe('ServiceImagesController', () => {
  let controller: ServiceImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceImagesController],
      providers: [ServiceImagesService],
    }).compile();

    controller = module.get<ServiceImagesController>(ServiceImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
