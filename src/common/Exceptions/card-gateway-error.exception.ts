import { ResponseCode } from '../response_codes';
import { BaseException } from './base.exception';

export class CardGatewayException extends BaseException {
  constructor(message?: string, responseCode?: string) {
    super(
      message ? message : 'Error processing request',
      responseCode ?? ResponseCode.API_MISSING,
    );
  }
}
