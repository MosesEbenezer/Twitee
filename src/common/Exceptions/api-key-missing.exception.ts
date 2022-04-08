import { ResponseCode } from '../response_codes';
import { BaseException } from './base.exception';

export class ApiKeyMissing extends BaseException {
  constructor(message?: string) {
    super(
      message ? message : 'Api Key Missing the header',
      ResponseCode.API_MISSING,
    );
  }
}
