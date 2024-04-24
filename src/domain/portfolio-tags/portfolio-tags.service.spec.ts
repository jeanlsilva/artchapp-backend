import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioTagsService } from './portfolio-tags.service';

describe('PortfolioTagsService', () => {
  let service: PortfolioTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioTagsService],
    }).compile();

    service = module.get<PortfolioTagsService>(PortfolioTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
