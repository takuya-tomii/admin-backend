import { Controller, Get } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DomainService } from './domain.service';
import { EnvService } from '../../../config/env/env.service';

@Controller('domain')
export class DomainController {
  constructor(
    private readonly domainService: DomainService,
    private readonly logger: PinoLogger,
    private readonly env: EnvService,
  ) {}

  @Get()
  getHello(): Promise<string> {
    this.logger.info('Hello from service controller');
    console.log(this.env.database.uri);
    return this.domainService.getHello();
  }
}
