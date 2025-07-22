import { Inject, Injectable } from '@nestjs/common';
import { PinoLogger, Params, PARAMS_PROVIDER_TOKEN } from 'nestjs-pino';

@Injectable()
export class LoggerService extends PinoLogger {
  constructor(@Inject(PARAMS_PROVIDER_TOKEN) params: Params) {
    super(params);
  }
}
