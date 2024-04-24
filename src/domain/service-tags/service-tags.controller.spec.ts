import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTagsController } from './service-tags.controller';
import { ServiceTagsService } from './service-tags.service';

describe('ServiceTagsController', () => {
  let controller: ServiceTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceTagsController],
      providers: [ServiceTagsService],
    }).compile();

    controller = module.get<ServiceTagsController>(ServiceTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
