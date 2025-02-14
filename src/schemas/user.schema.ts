import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// This will create a type that includes the Mongoose-specific properties (including _id)
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  user_name: string;

  @Prop({ unique: true })
  user_email: string;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  last_update: Date;

  @Prop({ default: Date.now })
  create_on: Date;
}

// Create a schema for the User class
export const UserSchema = SchemaFactory.createForClass(User);
