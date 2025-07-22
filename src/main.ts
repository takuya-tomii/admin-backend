import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { v4 as uuidV4 } from 'uuid';
import fastifyCookie from '@fastify/cookie';
import fastifyHelmet from '@fastify/helmet';
import { AppModule } from './app.module';
import { EnvService } from '~@config/env/env.service';
import { LoggerService } from '~@features/logger/logger.service';
import { fastifyCacheControl } from '~@plugins/fastify/cache-control.plugin';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    genReqId: () => uuidV4(),
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  const env = app.get(EnvService);
  const logger = app.get(LoggerService);

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });

  // TODO: 別のところに書けないかな？
  const parsedCorsOrigin = env.cors.map((origin) => {
    if (origin.startsWith('/') && origin.endsWith('/')) {
      return new RegExp(origin.slice(1, -1));
    }
    return origin;
  });

  app.enableCors({
    origin: parsedCorsOrigin,
    credentials: true,
    optionsSuccessStatus: 200,
  });

  // TODO: schema
  // TODO: fastify auth

  await app.register(fastifyCookie, {
    secret: env.auth.cookieSecret,
  });

  // NOTE: fastify-blipp は使わない

  const documentConfig = new DocumentBuilder()
    .addBasicAuth()
    .setTitle('管理画面 API')
    .setDescription('management system API')
    .setVersion('1.0')
    .addTag('apps', 'アプリケーション情報')
    .addTag('users', 'ユーザ情報')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('document', app, document);

  //

  app.register(fastifyCacheControl);

  app.setGlobalPrefix('api');

  await app.listen(env.listen.port, env.listen.address);
  logger.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
