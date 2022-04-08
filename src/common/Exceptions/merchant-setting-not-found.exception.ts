import { ResponseCode } from '../response_codes';
import { BaseException } from './base.exception';

export class MerchantSettingNotFound extends BaseException {
  constructor(message?: string) {
    super(
      message ? message : 'Merchant settings Not Found',
      ResponseCode.MERCHANT_SETTING_MISING,
    );
  }
}
