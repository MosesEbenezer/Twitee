import { ResponseCode } from '../response_codes';
import { BaseException } from './base.exception';

export class MerchantNotFound extends BaseException {
  constructor(message?: string) {
    super(
      message ? message : 'Merchant does not exist',
      ResponseCode.MERCHANT_NOT_FOUND,
    );
  }
}
