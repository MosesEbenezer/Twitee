import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TwitsService } from './twits.service';
import { CreateTwitDto } from './dto/create-twit.dto';
import { UpdateTwitDto } from './dto/update-twit.dto';

@Controller('twits')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.twitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTwitDto: UpdateTwitDto) {
    return this.twitsService.update(+id, updateTwitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.twitsService.remove(+id);
  }
}
