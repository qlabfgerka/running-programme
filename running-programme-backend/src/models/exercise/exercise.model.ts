import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.model';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
  id?: string | undefined | null = null;

  @Prop()
  name: string;

  @Prop()
  frequency: number;

  @Prop()
  currentMinutes: number;

  @Prop()
  currentSeconds: number;

  @Prop()
  goalMinutes: number;

  @Prop()
  goalSeconds: number;

  @Prop()
  goalDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
