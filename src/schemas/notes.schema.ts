import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotesDocument = HydratedDocument<Notes>;

@Schema()
export class Notes {

  @Prop()
  note_title: string;

  @Prop()
  note_content: string;

  @Prop()
  user_id:string;

  @Prop({ default: Date.now })
  last_update: Date;

  @Prop({ default: Date.now })
  create_on: Date;
}

export const NotesSchema = SchemaFactory.createForClass(Notes);
