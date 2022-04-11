import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('User Authentication')
@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: AuthDto) {
    const register = await this.authService.register(registerDto);
    return { data: register };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const register = await this.authService.login(email, password);
    return { data: register };
  }

  @Get()
  async findAll() {
    const ress = await this.authService.findAll();
    return { data: ress };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ress = await this.authService.findOne(+id);
    return { data: ress };
  }
}
