import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService extends AbstractService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {
    super(commentRepo);
  }

  async postComment(createCommentDto: CreateCommentDto) {
    const { comment, user_id, twit_id } = createCommentDto;
    const coment = await this.create({
      comment: comment,
      user_id: user_id,
      twit: { id: twit_id },
    });

    return coment;
  }

  async deleteComment(comment_id: string, user_id: string) {
    const twit = await this.findOne({
      id: comment_id,
      user_id: user_id,
    });

    if (!twit)
      throw new NotAcceptableException(
        'A Comment can only be deleted by the creator',
      );

    return await this.remove(twit.id);
  }
}
