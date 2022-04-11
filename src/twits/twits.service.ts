import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Twit } from './entities/twit.entity';

@Injectable()
export class TwitsService extends AbstractService {
  constructor(
    @InjectRepository(Twit) private readonly twitRepo: Repository<Twit>,
  ) {
    super(twitRepo);
  }

  async findOneUserTwit(id: string, user_id: string) {
    const twit = await this.findOne({
      id: id,
      user_id: user_id,
    });

    return twit;
  }

  async deleteTwit(id: string, user_id: string) {
    const twit = await this.findOne({
      id: id,
      user_id: user_id,
    });

    if (!twit)
      throw new NotAcceptableException(
        'A Twit can only be deleted by the creator',
      );

    return await this.remove(twit.id);
  }
}
