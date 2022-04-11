import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService extends AbstractService {
  constructor(
    @InjectRepository(Like) private readonly likeRepo: Repository<Like>,
  ) {
    super(likeRepo);
  }

  async toggleLike(twit_id: number, user_id: number) {
    const like = await this.findOne({
      user_id: user_id,
      twit: twit_id,
    });

    console.log('twit_id', twit_id);
    console.log('user_id', user_id);

    if (!like) {
      await this.create({
        twit: { id: twit_id },
        user_id: user_id,
      });
    } else {
      await this.remove(like.id);
    }

    return true;
  }
}
