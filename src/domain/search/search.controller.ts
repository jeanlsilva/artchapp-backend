import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

type City = { city: string };
type Specialty = { specialty: string; skills: string };

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('location')
  professionalsByCity(@Query() { city }: City) {
    return this.searchService.professionalsByCity(city);
  }

  @Get()
  professionalsBySpecialty(@Query() { specialty, skills }: Specialty) {
    const skillsArr = skills ? skills.split(',') : [];
    return this.searchService.professionalsBySpecialty(specialty, skillsArr);
  }

  @Get('package')
  searchPackages(@Query() { portfolios }) {
    const portfoliosArr = portfolios ? portfolios.split(',') : [];
    return this.searchService.findPackagesByPortfolios(portfoliosArr);
  }
}
