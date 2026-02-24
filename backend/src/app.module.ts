import { Module } from '@nestjs/common';
import { GuestbookModule } from './guestbook/guestbook.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [GuestbookModule],
  controllers: [HealthController],
})
export class AppModule {}