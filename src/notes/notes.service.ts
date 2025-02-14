import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from '../schemas/notes.schema';
@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes.name) private NotesModel: Model<Notes>) {}

  async createNotes(createNotesDto: any): Promise<Notes> {
    const createdNotes = new this.NotesModel(createNotesDto);
    return createdNotes.save();
  }

  async getAllnotes(userId: string): Promise<Notes[]> {
    return this.NotesModel.find({user_id: (userId)}).exec();
  }
  // gwt a note by user_id and note_id (_id)
  async getNoteByUserIdAndNoteId(userId: string, noteId: string): Promise<any> {
    const singleNote = await this.NotesModel.findOne({
      user_id: userId,
      _id: noteId,
    }).exec();

    if (!singleNote) {
      throw new Error('Note not found for this user_id');
    }

    return singleNote;
  }
  // Update a note by user_id
  async updateNoteByUserId(
    userId: string,
    noteId: string,
    updateData: any,
  ): Promise<Notes> {
    const updatedNote = await this.NotesModel.findOneAndUpdate(
      { user_id: userId, _id: noteId },
      { $set: updateData },
      { new: true },
    );

    // Check if the note exists and was updated
    if (!updatedNote) {
      throw new Error('Note not found for this user_id');
    }

    return updatedNote;
  }

  // Delete a note by user_id and note_id (_id)
  async deleteNoteByUserIdAndNoteId(
    userId: string,
    noteId: string,
  ): Promise<string> {
    // Try to find and delete the note where both user_id and _id match
    const result = await this.NotesModel.findOneAndDelete({
      user_id: userId,
      _id: noteId,
    });

    // Check if a note was deleted
    if (!result) {
      throw new Error(
        'No note found matching the provided user_id and note_id',
      );
    }

    return `Note with user_id ${userId} and note_id ${noteId} has been deleted successfully.`;
  }
}
