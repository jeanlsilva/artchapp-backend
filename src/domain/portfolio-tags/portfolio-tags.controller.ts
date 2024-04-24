import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortfolioTagsService } from './portfolio-tags.service';
import { CreatePortfolioTagDto } from './dto/create-portfolio-tag.dto';
import { UpdatePortfolioTagDto } from './dto/update-portfolio-tag.dto';

@Controller('portfolio-tags')
export class PortfolioTagsController {
  constructor(private readonly portfolioTagsService: PortfolioTagsService) {}

  @Post()
  create(@Body() createPortfolioTagDto: CreatePortfolioTagDto) {
    return this.portfolioTagsService.create(createPortfolioTagDto);
  }

  @Get()
  findAll() {
    return this.portfolioTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioTagsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortfolioTagDto: UpdatePortfolioTagDto) {
    return this.portfolioTagsService.update(id, updatePortfolioTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioTagsService.remove(id);
  }
}
