import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatHistoryController } from './chat-history.controller';
import { ChatHistoryService } from './chat-history.service';
import { JwtStrategy } from 'src/auth-guard/jwt.strategy';

@Module({
  controllers: [ChatHistoryController],
  providers: [ChatHistoryService, PrismaService, JwtStrategy],
})
export class ChatHistoryModule {}
