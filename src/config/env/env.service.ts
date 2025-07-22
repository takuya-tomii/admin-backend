import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { IEnv } from './env.interface';
import { ENV_KEYS } from './env.constant';

@Injectable()
export class EnvService implements IEnv {
  private readonly _tz: IEnv['tz'];

  private readonly _nodeEnv: IEnv['nodeEnv'];

  private readonly _configEnv: IEnv['configEnv'];

  private readonly _database: IEnv['database'];

  private readonly _cors: IEnv['cors'];

  private readonly _listen: IEnv['listen'];

  private readonly _auth: IEnv['auth'];

  constructor(config: ConfigService) {
    this._tz = config.get(ENV_KEYS.TZ)!;
    this._database = {
      uri: config.get(ENV_KEYS.DATABASE.URI)!,
    };
    this._configEnv = config.get(ENV_KEYS.CONFIG_ENV)!;
    this._nodeEnv = config.get(ENV_KEYS.NODE_ENV)!;
    this._cors = config.get(ENV_KEYS.CORS_ORIGINS)!.split(',');
    this._listen = {
      port: config.get(ENV_KEYS.LISTEN.PORT)!,
      address: config.get(ENV_KEYS.LISTEN.ADDRESS)!,
    };

    this._auth = {
      jwtSecret: config.get(ENV_KEYS.AUTH.JWT_SECRET)!,
      refreshTokenSecret: config.get(ENV_KEYS.AUTH.REFRESH_TOKEN_SECRET)!,
      cookieSecret: config.get(ENV_KEYS.AUTH.COOKIE_SECRET)!,
      sessionExpiry: config.get(ENV_KEYS.AUTH.SESSION_EXPIRY)!,
      refreshTokenExpiry: config.get(ENV_KEYS.AUTH.REFRESH_TOKEN_EXPIRY)!,
      jwtIssuer: config.get(ENV_KEYS.AUTH.JWT_ISSUER)!,
      jwtAudience: config.get(ENV_KEYS.AUTH.JWT_AUDIENCE)!,
    };
  }

  get tz() {
    return this._tz;
  }

  get nodeEnv() {
    return this._nodeEnv;
  }

  get configEnv() {
    return this._configEnv;
  }

  get database() {
    return this._database;
  }

  get cors() {
    return this._cors;
  }

  get listen() {
    return this._listen;
  }

  get auth() {
    return this._auth;
  }
}
