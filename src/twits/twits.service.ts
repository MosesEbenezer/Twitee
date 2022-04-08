import { Injectable } from '@nestjs/common';
import { CreateTwitDto } from './dto/create-twit.dto';
import { UpdateTwitDto } from './dto/update-twit.dto';

@Injectable()
export class TwitsService {
  create(createTwitDto: CreateTwitDto) {
    return 'This action adds a new twit';
  }

  findAll() {
    return `This action returns all twits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} twit`;
  }

  update(id: number, updateTwitDto: UpdateTwitDto) {
    return `This action updates a #${id} twit`;
  }

  remove(id: number) {
    return `This action removes a #${id} twit`;
  }
}
