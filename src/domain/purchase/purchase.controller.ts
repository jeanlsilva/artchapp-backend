import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchaseEventsEnum } from './purchase.events';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService, private eventEmitter: EventEmitter2) {}

  @Post()
  async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    const createPurchase = await this.purchaseService.create(createPurchaseDto);

    this.eventEmitter.emit(PurchaseEventsEnum.CREATED, createPurchase);
    return createPurchase;
  }

  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(id);
  }

  @Get('users/:id')
  findByUser(@Param('id') userId: string) {
    return this.purchaseService.findByUser(userId);
  }

  @Get('professional/:id')
  findByProfessional(@Param('id') professionalId: string) {
    return this.purchaseService.findByProfessional(professionalId);
  }

  /*
  @Get(':id/packages')
  findPackagesById(@Param('id') id: string) {
    return this.purchaseService.findPackagesById(id);
  } */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(id);
  }
}
