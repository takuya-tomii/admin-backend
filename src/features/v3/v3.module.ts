import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, DomainModule],
})
export class V3Module {}
