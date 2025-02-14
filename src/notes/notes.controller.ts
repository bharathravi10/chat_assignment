import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Notes } from 'src/schemas/notes.schema';
import { AuthGuard } from 'src/auth/auth.guard.ts';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @UseGuards(AuthGuard)
  @Post('add')
  async createNote(@Body() createNotesDto: any, @Request() req,): Promise<Notes> {
    return this.notesService.createNotes({...createNotesDto, user_id: req.user.user_id});
  }

  @UseGuards(AuthGuard)
  @Put('update/:noteId')
  async updateNote(
    @Request() req,
    @Param('noteId') noteId: string,
    @Body() updateData: any,
  ): Promise<Notes> {
    // Pass both userId and noteId to the service method
    return this.notesService.updateNoteByUserId(req.user.user_id, noteId, updateData);
  }
  // implement to get a single note
  @UseGuards(AuthGuard)
  @Get('singleNote/:noteId')
  async getNote(@Request() req,
    @Param('noteId') noteId: string,
  ): Promise<Notes> {
    return this.notesService.getNoteByUserIdAndNoteId(req.user.user_id, noteId);
  }
  @UseGuards(AuthGuard)
  @Get()
  getAllNote(@Request() req): Promise<Notes[]> {
    return this.notesService.getAllnotes(req.user.user_id);
  }

  // Delete a note by both user_id and note_id
  @UseGuards(AuthGuard)
  @Delete('delete/:noteId')
  async deleteNote(
    @Request() req,
    @Param('noteId') noteId: string,
  ): Promise<string> {
    return this.notesService.deleteNoteByUserIdAndNoteId(req.user.user_id, noteId);
  }
}
