import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Exercise } from '../exercise/exercise.model';
import { Plan } from './plan.model';

export type PlansDocument = Plans & Document;

@Schema()
export class Plans {
  id?: string | undefined | null = null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' })
  exercise: Exercise;

  @Prop()
  plans: Plan[];
}

export const PlansSchema = SchemaFactory.createForClass(Plans);
