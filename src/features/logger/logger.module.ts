import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            // NOTE: 2024-12-04T01:13:46.911+0900
            translateTime: "SYS:yyyy-mm-dd'T'HH:MM:ss.lo",
            ignore: 'req.headers.authorization',
          },
        },
      },
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
