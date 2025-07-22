import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { App, APP_COLLECTION } from '~@database/schemas/app.schema';
import { Domain, DOMAIN_COLLECTION } from '~@database/schemas/domain.schema';
import {
  AUTH_USER_COLLECTION,
  AuthUser,
} from '~@database/schemas/auth-user.schema';
import { Session, SESSION_COLLECTION } from '~@database/schemas/session.schema';

@Injectable()
export class DomainService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(APP_COLLECTION) private readonly appMdodel: Model<App>,
    @InjectModel(DOMAIN_COLLECTION) private readonly domainModel: Model<Domain>,
    @InjectModel(AUTH_USER_COLLECTION)
    private readonly authUserModel: Model<AuthUser>,
    @InjectModel(SESSION_COLLECTION)
    private readonly sessionModel: Model<Session>,
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
  ) {}

  async getHello(): Promise<string> {
    const user = await this.authUserModel.create({
      name: 'test',
      plusId: 'test',
      userId: 'test',
      tenantId: 'test',
      permitLevel: 1,
      permission: 1,
      authStrategy: 1,
      domainId: 'test',
      Domain: 'test',
      DomainId: 'test',
    });

    const session = await this.sessionModel.create({
      refreshTokenId: 'test22',
      tokenId: 'test22',
      user,
      expired: [
        {
          refreshTokenId: 'test22',
          tokenId: 'test22',
        },
      ],
    });

    console.log(session);
    console.log(session.tokenId);

    // const a = user.session.expired;
    // await this.domainModel.create({
    //   uid: 'tesat',
    //   secret: 'testaa',
    //   name: 'test',
    // });
    return 'Hello from domain service';
  }
}
