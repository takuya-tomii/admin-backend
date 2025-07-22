import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DomainDocument = HydratedDocument<Domain>;

@Schema()
export class Domain {
  @Prop({
    required: true,
    unique: true,
  })
  uid: string;

  @Prop()
  name: string;

  @Prop({
    default: '',
  })
  description: string;

  @Prop({
    default: 0,
  })
  apps: number;

  @Prop({
    default: '',
  })
  externalPublishUrl: string;

  @Prop()
  konnect_base_url: string;

  @Prop()
  konnect_domain_tenant_id: string;

  @Prop()
  konnect_domain_user_id: string;

  @Prop()
  konnect_domain_api_key: string;

  @Prop()
  _email: string;

  @Prop()
  _password: string;

  @Prop()
  _apikey: string;

  @Prop()
  _domainkey: string;

  @Prop()
  _url: string;

  @Prop()
  __apikey: string;

  @Prop()
  secureauth__apikey: string;

  @Prop()
  crm_connect_email: string;

  @Prop()
  crm_connect_password: string;

  @Prop()
  crm_connect_apikey: string;

  @Prop()
  crm_connect_domainkey: string;

  @Prop()
  crm_connect_url: string;

  @Prop()
  crm_connect__apikey: string;

  @Prop({
    default: false,
  })
  action_log: boolean;

  @Prop({
    default: false,
  })
  deleted: boolean;

  @Prop({
    default: false,
  })
  use_service: boolean;

  @Prop({
    default: false,
  })
  use_mbcsl: boolean;

  @Prop()
  service_name: string;

  @Prop({
    default: false,
  })
  deployed: boolean;

  @Prop()
  mbcslApiKey: string;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);

DomainSchema.index({ deleted: 1, uid: 1 }, { background: true });
DomainSchema.index({ deleted: 1 }, { background: true });
DomainSchema.index({ uid: 1 }, { background: true });
DomainSchema.index(
  { deleted: 1, uid: 1, name: 1, description: 1 },
  { background: true },
);
export const DOMAIN_COLLECTION = 'domains';
