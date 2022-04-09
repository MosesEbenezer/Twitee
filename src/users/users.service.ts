import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { EnvService } from 'src/common/env.service';
import { ExternalApiCalls } from 'src/common/external-api-calls.service';
import { Repository } from 'typeorm';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const env_config = new EnvService().read();
const exter_api_calls = new ExternalApiCalls();
const NOTN_BASE_URL = env_config.NOTN_BASE_URL;

@Injectable()
export class UsersService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super(userRepo);
  }

  async sendUserAuthNotifications(data: any): Promise<any> {
    console.log('data for notify', data);

    const user_notn = await exter_api_calls.postData(
      `${NOTN_BASE_URL}/notifications/send`,
      data,
    );

    if (!user_notn)
      throw new NotImplementedException(
        'User Notification Could Not Be Sent. An Error Occured',
      );

    return user_notn.data;
  }
}
