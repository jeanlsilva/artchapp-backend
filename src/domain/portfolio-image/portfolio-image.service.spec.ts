import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioImageService } from './portfolio-image.service';

describe('PortfolioImageService', () => {
  let service: PortfolioImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioImageService],
    }).compile();

    service = module.get<PortfolioImageService>(PortfolioImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
