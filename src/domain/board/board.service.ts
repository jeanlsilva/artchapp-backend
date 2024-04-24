import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {}

  async create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.save(createBoardDto);
  }

  async findAll() {
    return this.boardRepository.find();
  }

  async findOne(id: string) {
    return this.boardRepository.findOne(id);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    return this.boardRepository.update(id, updateBoardDto);
  }

  async remove(id: string) {
    return this.boardRepository.delete(id);
  }
}
