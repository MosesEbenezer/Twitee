import { PartialType } from '@nestjs/swagger';
import { CreateTwitDto } from './create-twit.dto';

export class UpdateTwitDto extends PartialType(CreateTwitDto) {}
