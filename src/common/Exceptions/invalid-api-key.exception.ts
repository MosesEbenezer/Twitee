import { ResponseCode } from '../response_codes';
import { BaseException } from './base.exception';

export class InvalidApiKey extends BaseException {
  public statusCode: string;
  constructor(message?: string) {
    super(
      message ? message : 'Invaid Api Key supplied',
      ResponseCode.INVALID_API_KEY,
    );
  }
}
