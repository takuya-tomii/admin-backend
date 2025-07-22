import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AppDocument = HydratedDocument<App>;

@Schema()
export class App {
  @Prop({
    required: true,
    unique: true,
  })
  uid: string;

  @Prop({
    required: true,
    unique: true,
  })
  secret: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  domain_id: string;

  @Prop()
  operator_id: string;

  @Prop({
    default: false,
  })
  deleted: boolean;
}

export const AppSchema = SchemaFactory.createForClass(App);

AppSchema.index({ uid: 1, secret: 1, deleted: 1 }, { background: true });
AppSchema.index({ uid: 1, deleted: 1 }, { background: true });
AppSchema.index({ domain_id: 1, uid: 1 }, { background: true });
AppSchema.index(
  { deleted: 1, domain_id: 1, uid: 1, name: 1, description: 1 },
  { background: true },
);
export const APP_COLLECTION = 'apps';
