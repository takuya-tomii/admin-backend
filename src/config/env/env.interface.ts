import { CONFIG_ENVS, NODE_ENVS } from './env.constant';

type NodeEnv = (typeof NODE_ENVS)[keyof typeof NODE_ENVS];
type ConfigEnv = (typeof CONFIG_ENVS)[keyof typeof CONFIG_ENVS];

export interface IEnv {
  tz: string;
  nodeEnv: NodeEnv;
  configEnv: ConfigEnv;
  database: {
    uri: string;
  };
  cors: string[];
  listen: {
    port: number;
    address: string;
  };
  auth: {
    jwtSecret: string;
    refreshTokenSecret: string;
    cookieSecret: string;
    sessionExpiry: number;
    refreshTokenExpiry: number;
    jwtIssuer: string;
    jwtAudience: string;
  };
}
