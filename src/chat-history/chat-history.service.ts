import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as xlsx from 'xlsx';
import { ChatHistoryConstants } from './constants';

@Injectable()
export class ChatHistoryService {
  constructor(private prisma: PrismaService) {}

  async importChatHistory(fileBuffer: Buffer) {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      throw new HttpException(
        ChatHistoryConstants.INVALID_DATA,
        HttpStatus.BAD_REQUEST,
      );
    }

    const sheet = workbook.Sheets[sheetName];
    const chatData = xlsx.utils.sheet_to_json(sheet);

    if (!chatData || chatData.length === 0) {
      throw new HttpException(
        ChatHistoryConstants.EMPTY,
        HttpStatus.BAD_REQUEST,
      );
    }

    const formattedChats = chatData.map((row: any) => {
      if (!row.sender || !row.receiver || !row.message || !row.timestamp) {
        throw new HttpException(
          ChatHistoryConstants.INVALID_DATA,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      return {
        sender: row.sender,
        receiver: row.receiver,
        message: row.message,
        timestamp: new Date(row.timestamp),
      };
    });

    await this.prisma.chat.createMany({ data: formattedChats });

    return {
      statusCode: HttpStatus.CREATED,
      message: ChatHistoryConstants.SUCCESS,
      importedRecords: formattedChats.length,
    };
  }
}
