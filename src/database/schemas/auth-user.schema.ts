import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import type { Session } from './session.schema';

export type AuthUserDocument = mongoose.HydratedDocument<AuthUser>;

@Schema()
export class AuthUser {
  @Prop()
  name: string;

  @Prop()
  plusId: string;

  @Prop()
  userId: string;

  @Prop()
  tenantId: string;

  @Prop()
  permitLevel: number;

  @Prop()
  permission: number;

  @Prop()
  authStrategy: number;

  @Prop()
  domainId: string;

  @Prop()
  Domain: string;

  @Prop()
  DomainId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Session' })
  session: Session;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
export const AUTH_USER_COLLECTION = 'authUsers';
