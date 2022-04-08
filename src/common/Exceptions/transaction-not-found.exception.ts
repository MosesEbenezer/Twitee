import { ResponseCode } from '../response_codes';
import { BaseException } from './base.exception';

export class TransactionNotFound extends BaseException {
  constructor(message?: string) {
    super(
      message ? message : 'Transaction not found',
      ResponseCode.TRANSACTION_NOT_FOUND,
    );
  }
}
