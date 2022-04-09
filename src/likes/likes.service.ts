import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
// import { CreateLikeDto } from './dto/create-like.dto';
// import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService extends AbstractService {
  constructor(
    @InjectRepository(Like) private readonly likeRepo: Repository<Like>,
  ) {
    super(likeRepo);
  }
}
