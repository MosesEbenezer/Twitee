import { ResponseCode } from '../response_codes';
import { BaseException } from './base.exception';

export class DuplicateTransaction extends BaseException {
  public statusCode: string;
  constructor(message?: string) {
    super(
      message ? message : 'Duplicate transaction',
      ResponseCode.DUPLICATE_TRANSACTION,
    );
  }
}
