import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(
    req: FastifyRequest,
    res: FastifyReply,
    next: (error?: Error | any) => void,
  ) {
    console.log('Request...');
    next();
  }
}
