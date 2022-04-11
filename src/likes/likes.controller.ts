import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@ApiTags('Likes')
@UseInterceptors(ResponseInterceptor)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  async toggleLike(
    @Param('twit_id') twit_id: string,
    @Param('user_id') user_id: string,
  ) {
    const like = await this.likesService.toggleLike(twit_id, user_id);
    return { data: like };
  }
}
