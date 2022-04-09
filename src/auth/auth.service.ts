import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AbstractService } from 'src/common/abstract.service';
import { auth_actions_html } from 'src/common/utils/auth-actions-helper';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Connection, Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { TokenVerifyActionDto } from './dto/token-verify-action.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { AuthActions, AuthRequestType } from './entities/auth.entity';

@Injectable()
export class AuthService extends AbstractService {
  constructor(
    @InjectRepository(AuthActions)
    private readonly authActionRepo: Repository<AuthActions>,
    private jwtService: JwtService,
    private userService: UsersService,
    private connection: Connection,
  ) {
    super(authActionRepo);
  }

  async register(registerDto: AuthDto): Promise<any> {
    await this.validateEmail(registerDto);
    const { password_confirm, ...others } = registerDto;

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const hash = await this.hashDetail(registerDto.password);

    try {
      const user_data = {
        ...others,
        password: hash,
      };

      const user = await queryRunner.manager.save(User, user_data);

      // send verify email notification.
      const { auth_action, request_token } = await this.verifyEmail(
        user.email,
        user.id,
      );

      if (auth_action) console.log('Verify Email Notificaiton Sent');

      await queryRunner.commitTransaction();
      return {
        user: user,
        request_token: request_token,
      };
    } catch (error) {
      console.log('An Error Occured', error);
      await queryRunner.rollbackTransaction();
      throw new NotAcceptableException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async hashDetail(field: string): Promise<string> {
    return await bcrypt.hash(field, 10);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email });

    if (!user) throw new NotFoundException('Unrecognized User Details');
    console.log('user found in login', user);

    if (!(await this.bcryptCompare(pass, user.password)))
      throw new BadRequestException('Invalid Email or Password');

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  async bcryptCompare(passed: string, to_compare: string) {
    return await bcrypt.compare(passed, to_compare);
  }

  async validateToken(token: string): Promise<any> {
    try {
      const verify_res = await this.jwtService.verifyAsync(token);
      console.log('token verify response', verify_res);
      return verify_res;
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }

  async validateEmail(registerDto: AuthDto): Promise<any> {
    const existing_acct = await this.userService.findOne({
      email: registerDto.email,
    });

    if (existing_acct) throw new BadRequestException('Email Already Exist');
  }

  async getUserAfterTokenVerify(validateTokenDto: ValidateTokenDto) {
    const { token } = validateTokenDto;
    const { username } = await this.validateToken(token);

    let user: any;
    if (username) {
      user = await this.getUserWithUsername(username);

      console.log('now date and time', new Date(Date.now()).toISOString());

      // update last login
      await this.userService.update(user.id, {
        last_login: new Date(Date.now()).toISOString(),
      });
    }

    return user;
  }

  async getUserWithUsername(username: string) {
    const user = await this.userService.findOne({ email: username });

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  async signJwt(user: User) {
    const payload = { username: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '10h',
    });
    return access_token;
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    return await this.signJwt(user);
  }

  async tokenVerifyAction(tokenVerifyActionDto: TokenVerifyActionDto) {
    const auth_action = await this.findOne({
      ...tokenVerifyActionDto,
    });

    if (!auth_action) throw new NotFoundException('Invalid OTP');

    if (
      auth_action.request_otp !== tokenVerifyActionDto.request_otp ||
      auth_action.request_token !== tokenVerifyActionDto.request_token
    )
      throw new NotAcceptableException('Tokens do not Match');

    return auth_action;
  }

  // Use a more user friendly email message
  async verifyEmail(email: string, user_id: number): Promise<any> {
    const request_token = await this.genAuthActionToken();
    const request_otp = await this.genAuthActionOtp();
    const data = {
      heading_logo: ``,
      heading: `Welcome To TWITEE`,
      message1: `We're excited to have you onboard. You're one step closer to completing your registration`,
      message2: `Please use the code below to verify your email.`,
      message3: ``,
      cta: `CONFIRM YOUR EMAIL`,
      request_otp: request_otp,
      // url: `${FRONT_END_BASE_URL}/verify/user_id/email/token`,
      type: AuthRequestType.EMAIL_VERIFY,
    };

    const html = auth_actions_html(data);
    const request_ref = await this.genNotificationRef();

    const email_verify_notification = {
      sender: 'TWITEE',
      title: 'Welcome To TWITEE',
      description: 'Please Verify Your Email',
      notification_type: 'IMPORTANT_ACTION',
      notification_mode: 'SINGLE',
      notification_channel: 'EMAIL',
      recipients_user_id: user_id,
      recipients_email: email,
      recipients_phone_number: 'null',
      request_ref: `VRFY_${request_ref}`, // generate
      message: 'null',
      html: 'null',
      complete_html_body: html,
      show_advert: false,
    };

    const auth_action_data = {
      notification_data: { ...email_verify_notification },
      user_id: user_id,
      request_type: AuthRequestType.EMAIL_VERIFY,
      request_token: `${request_token}`,
      request_otp: `${request_otp}`,
      email: email,
    };

    console.log('auth_action_data to save', auth_action_data);

    const auth_action = await this.authActionNotification(auth_action_data);
    return { auth_action, request_token };
  }

  async authActionNotification(data: any): Promise<any> {
    const auth_notn = await this.userService.sendUserAuthNotifications(
      data.notification_data,
    );

    if (!auth_notn)
      throw new NotImplementedException('Auth Notification Not Sent');

    const auth_action = await this.authActionRepo.save({
      user_id: data.user_id,
      request_type: data.request_type,
      request_token: `${data.request_token}`,
      request_otp: `${data.request_otp}`,
      email: data.email,
    });

    if (!auth_action)
      throw new NotImplementedException('Auth Action Not Saved');

    console.log('Auth action saved');
    return auth_action;
  }

  async confirmEmailVerifyAction(verifyEmailDto: VerifyEmailDto): Promise<any> {
    const auth_action = await this.tokenVerifyAction(verifyEmailDto);

    // update email verification status
    const user = await this.userService.update(auth_action.user_id, {
      email_verified: true,
    });
    return user;
  }

  async genAuthActionToken(): Promise<number> {
    return Math.floor(Math.random() * 1032233 + 1043481);
  }

  async genAuthActionOtp(): Promise<number> {
    return Math.floor(Math.random() * 6654355 + 165666);
  }

  async genNotificationRef(): Promise<number> {
    return Math.floor(Math.random() * 1008989883 + 1090900441);
  }
}
