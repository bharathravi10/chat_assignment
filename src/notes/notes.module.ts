
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {Notes,NotesSchema} from '../schemas/notes.schema'
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Notes.name, schema: NotesSchema }])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
