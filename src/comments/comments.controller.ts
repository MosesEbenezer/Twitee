import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('comments')
@UseInterceptors(ResponseInterceptor)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    const comm = await this.commentsService.postComment(createCommentDto);
    return { data: comm };
  }

  @Delete(':id')
  remove(
    @Param('comment_id') comment_id: string,
    @Param('user_id') user_id: string,
  ) {
    return this.commentsService.deleteComment(comment_id, user_id);
  }
}
