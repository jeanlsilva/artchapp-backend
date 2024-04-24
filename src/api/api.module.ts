import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';

@Module({
  controllers: [ApiController],
  imports: [HttpModule],
  providers: [ApiService],
})
export class ApiModule {}
