import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from '~@config/env/env.module';
import { EnvService } from '~@config/env/env.service';
import { LoggerModule } from '~@features/logger/logger.module';
import { V3Module } from '~@features/v3/v3.module';
import { HealthcheckModule } from '~@features/healthcheck/healthcheck.module';

@Module({
  imports: [
    LoggerModule,
    EnvModule,
    MongooseModule.forRootAsync({
      useFactory: (env: EnvService) => ({
        uri: env.database.uri,
      }),
      inject: [EnvService],
    }),
    V3Module,
    HealthcheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: '/test', method: RequestMethod.GET });
//   }
// }
