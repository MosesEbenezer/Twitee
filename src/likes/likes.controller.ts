import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { ToggleLikeDto } from './dto/toggle-like.dtp';

@ApiTags('Likes')
@UseInterceptors(ResponseInterceptor)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async toggleLike(@Body() toggleLikeDto: ToggleLikeDto) {
    const { twid_id, user_id } = toggleLikeDto;
    console.log('twit_id param', twid_id);
    console.log('user_id param', user_id);

    const like = await this.likesService.toggleLike(twid_id, user_id);
    return { data: like };
  }
}
