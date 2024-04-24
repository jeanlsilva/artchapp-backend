import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioImageController } from './portfolio-image.controller';
import { PortfolioImageService } from './portfolio-image.service';

describe('PortfolioImageController', () => {
  let controller: PortfolioImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioImageController],
      providers: [PortfolioImageService],
    }).compile();

    controller = module.get<PortfolioImageController>(PortfolioImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
