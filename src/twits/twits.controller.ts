import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { TwitsService } from './twits.service';
import { CreateTwitDto } from './dto/create-twit.dto';
import { UpdateTwitDto } from './dto/update-twit.dto';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Twits')
@Controller('twits')
@UseInterceptors(ResponseInterceptor)
export class TwitsController {
  constructor(private readonly twitsService: TwitsService) {}

  @Post()
  create(@Body() createTwitDto: CreateTwitDto) {
    return this.twitsService.create(createTwitDto);
  }

  @Get()
  findAll() {
    return this.twitsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.twitsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTwitDto: UpdateTwitDto) {
    return this.twitsService.update(+id, updateTwitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.twitsService.remove(+id);
  }
}
