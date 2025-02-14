import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class ImportChatDto {
  @IsNotEmpty()
  @IsString()
  sender: string;

  @IsNotEmpty()
  @IsString()
  receiver: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsDate()
  timestamp: Date;
}
