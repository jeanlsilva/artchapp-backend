import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import slugify from 'slugify';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    createServiceDto.slug = slugify(createServiceDto.label);
    return this.serviceService.create(createServiceDto);
  }

  @Get('/all')
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Get('portfolio/:portfolio')
  findByPortfolio(@Param('portfolio') portfolio: string) {
    return this.serviceService.findByPortfolio(portfolio);
  }

  @Get('user/:id')
  findByUser(@Param('id') userId: string) {
    return this.serviceService.findByUser(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }

  @Post(':id/tag')
  addTagToService(@Param('id') serviceId: string, @Body() { tags }) {
    return this.serviceService.addTagToService(serviceId, tags);
  }

  @Delete(':id/tag/:tagId')
  removeTagFromService(@Param('id') serviceId: string, @Param('tagId') tagId: string) {
    return this.serviceService.removeTagFromService(serviceId, tagId);
  }
}
