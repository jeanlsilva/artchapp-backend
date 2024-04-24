import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioTagsController } from './portfolio-tags.controller';
import { PortfolioTagsService } from './portfolio-tags.service';

describe('PortfolioTagsController', () => {
  let controller: PortfolioTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioTagsController],
      providers: [PortfolioTagsService],
    }).compile();

    controller = module.get<PortfolioTagsController>(PortfolioTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
