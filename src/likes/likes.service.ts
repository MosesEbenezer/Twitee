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

  async toggleLike(twit_id: string, user_id: string) {
    const like = await this.findOne({
      twit: { id: twit_id },
      user_id: user_id,
    });

    if (!like) {
      await this.create({
        twit: { id: twit_id },
        user_id: user_id,
      });
    } else {
      await this.remove(like.id);
    }
  }
}
