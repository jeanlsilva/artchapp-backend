import { Controller, Get, Post, Body, Put, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @Get()
  findAll() {
    return this.packageService.findAll();
  }

  @Get('page')
  findPaginatedPackages(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.packageService.findPaginatedResults(page, limit);
  }

  @Get('recents')
  findRecent() {
    return this.packageService.find10Recent();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(id);
  }

  @Get(':id/services')
  findServicesById(@Param('id') id: string) {
    return this.packageService.findServicesById(id);
  }

  @Get('user/:id')
  findByUser(@Param('id') userId: string) {
    return this.packageService.findByUser(userId);
  }

  @Get('user/:id/page')
  findPaginatedPackagesByUser(
    @Param('id') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ) {
    return this.packageService.findPaginatedResultsByUser(page, limit, userId)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageService.remove(id);
  }

  @Post(':id/tag')
  addTagToPackage(@Param('id') id: string, @Body() { tags }) {
    return this.packageService.addTagToPackage(id, tags);
  }

  @Delete(':id/tag/:tagId')
  removeTagFromService(@Param('id') id: string, @Param('tagId') tagId: string) {
    return this.packageService.removeTagFromPackage(id, tagId);
  }
}
