import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { TwitsService } from './twits.service';
import { CreateTwitDto } from './dto/create-twit.dto';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Twits')
@Controller('twits')
@UseInterceptors(ResponseInterceptor)
export class TwitsController {
  constructor(private readonly twitsService: TwitsService) {}

  @Post()
  async create(@Body() createTwitDto: CreateTwitDto) {
    const twit = await this.twitsService.create(createTwitDto);
    return { data: twit };
  }

  @Get()
  async findAll() {
    const twits = await this.twitsService.findAll();
    return { data: twits };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const twit = await this.twitsService.findOne(+id);
    return { data: twit };
  }

  // one user twit
  @Get(':id/:user_id')
  async findOneUserTwit(
    @Param('id') id: string,
    @Param('user_id') user_id: string,
  ) {
    const twit = await this.twitsService.findOneUserTwit(id, user_id);
    return { data: twit };
  }

  @Delete(':id/:user_id')
  remove(@Param('id') id: string, @Param('user_id') user_id: string) {
    return this.twitsService.deleteTwit(id, user_id);
  }
}
