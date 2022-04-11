import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ToggleLikeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  twid_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
