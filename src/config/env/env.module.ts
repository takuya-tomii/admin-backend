import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvService } from './env.service';
import { CONFIG_ENVS, NODE_ENVS } from './env.constant';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      validationSchema: Joi.object({
        TZ: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid(...Object.values(NODE_ENVS))
          .required(),
        CONFIG_ENV: Joi.string()
          .valid(...Object.values(CONFIG_ENVS))
          .required(),
        DATABASE_URI: Joi.string().required(),
        CORS_ORIGINS: Joi.string().required(),
        LISTEN_PORT: Joi.number().required(),
        LISTEN_ADDRESS: Joi.string().required(),
        AUTH_JWT_SECRET: Joi.string().required(),
        AUTH_REFRESH_TOKEN_SECRET: Joi.string().required(),
        AUTH_COOKIE_SECRET: Joi.string().required(),
        AUTH_SESSION_EXPIRY: Joi.number().required(),
        AUTH_REFRESH_TOKEN_EXPIRY: Joi.number().required(),
        AUTH_JWT_ISSUER: Joi.string().required(),
        AUTH_JWT_AUDIENCE: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
