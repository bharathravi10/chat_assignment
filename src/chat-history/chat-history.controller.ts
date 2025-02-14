import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ChatHistoryService } from './chat-history.service';
import { JwtAuthGuard } from 'src/auth-guard/jwt-auth.guard';
import { ChatHistoryConstants } from './constants';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatHistoryController {
  constructor(private chatService: ChatHistoryService) {}

  @Post('import')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async importChat(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(ChatHistoryConstants.NO_FILE);
    }

    return await this.chatService.importChatHistory(file.buffer);
  }
}
