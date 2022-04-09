import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
// import { CreateTwitDto } from './dto/create-twit.dto';
// import { UpdateTwitDto } from './dto/update-twit.dto';
import { Twit } from './entities/twit.entity';

@Injectable()
export class TwitsService extends AbstractService {
  constructor(
    @InjectRepository(Twit) private readonly twitRepo: Repository<Twit>,
  ) {
    super(twitRepo);
  }
}
