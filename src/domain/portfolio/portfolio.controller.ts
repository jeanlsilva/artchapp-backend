import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Get('recents')
  getRecents() {
    return this.portfolioService.find10Recents();
  }

  @Get()
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get('page')
  findPaginatedPortfolios(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.portfolioService.findPaginatedResults(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(id);
  }

  @Get('/user/:id')
  findByUser(@Param('id') userId: string) {
    return this.portfolioService.findByUser(userId);
  }

  @Get('/user/:id/page')
  findPaginatedResultsByUser(
    @Param('id') userId: string, 
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.portfolioService.findPaginatedResultsByUser(page, limit, userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePortfolioDto: UpdatePortfolioDto) {
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  }

  @Post(':id/tag')
  addTagToPortfolio(@Param('id') portfolioId: string, @Body() { tags }) {
    return this.portfolioService.addTagToPortfolio(portfolioId, tags);
  }

  @Delete(':id/tag/:tagId')
  removeTagFromPortfolio(@Param('id') portfolioId: string, @Param('tagId') tagId: string) {
    return this.portfolioService.removeTagFromPortfolio(portfolioId, tagId);
  }

  @Post(':id/package')
  addPackageToPortfolio(@Param('id') portfolioId: string, @Body() { packages }) {
    return this.portfolioService.addPackageToPortfolio(portfolioId, packages);
  }

  @Delete(':id/package/:packageId')
  removePackageFromPortfolio(@Param('id') portfolioId: string, @Param('packageId') packageId: string) {
    return this.portfolioService.removePackageFromPortfolio(portfolioId, packageId);
  }
}
