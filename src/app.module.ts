import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatHistoryModule } from './chat-history/chat-history.module';

@Module({
  imports: [AuthModule, ChatHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
