import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';
import { APP_COLLECTION, AppSchema } from '~@database/schemas/app.schema';
import {
  DOMAIN_COLLECTION,
  DomainSchema,
} from '~@database/schemas/domain.schema';
import {
  SESSION_COLLECTION,
  SessionSchema,
} from '~@database/schemas/session.schema';
import {
  AUTH_USER_COLLECTION,
  AuthUserSchema,
} from '~@database/schemas/auth-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: APP_COLLECTION, schema: AppSchema },
      { name: DOMAIN_COLLECTION, schema: DomainSchema },
      { name: SESSION_COLLECTION, schema: SessionSchema },
      { name: AUTH_USER_COLLECTION, schema: AuthUserSchema },
    ]),
  ],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainModule {}
