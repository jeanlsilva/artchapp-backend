import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceTagsService } from './service-tags.service';
import { CreateServiceTagDto } from './dto/create-service-tag.dto';
import { UpdateServiceTagDto } from './dto/update-service-tag.dto';

@Controller('service-tags')
export class ServiceTagsController {
  constructor(private readonly serviceTagsService: ServiceTagsService) {}

  @Post()
  create(@Body() createServiceTagDto: CreateServiceTagDto) {
    return this.serviceTagsService.create(createServiceTagDto);
  }

  @Get()
  findAll() {
    return this.serviceTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceTagsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceTagDto: UpdateServiceTagDto) {
    return this.serviceTagsService.update(id, updateServiceTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceTagsService.remove(id);
  }
}
