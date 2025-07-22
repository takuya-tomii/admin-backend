import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import type { AuthUser } from './auth-user.schema';
import { App } from './app.schema';

export type SessionDocument = mongoose.HydratedDocument<Session>;

type ExpiredData = {
  refreshTokenId: string;
  tokenId: string;
};

@Schema()
export class Session {
  @Prop({
    required: true,
  })
  refreshTokenId: string;

  @Prop({
    required: true,
  })
  tokenId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user: App;

  @Prop(
    raw([
      {
        refreshTokenId: { type: String, default: '' },
        tokenId: { type: String, default: '' },
      },
    ]),
  )
  expired: ExpiredData[];
}

export const SessionSchema = SchemaFactory.createForClass(Session);

SessionSchema.index({ refreshTokenId: 1 }, { unique: true, background: true });
SessionSchema.index({ tokenId: 1 }, { unique: true, background: true });
SessionSchema.index({ user: 1 }, { background: true });
SessionSchema.index({ updatedAt: 1 }, { background: true });

export const SESSION_COLLECTION = 'sessions';
