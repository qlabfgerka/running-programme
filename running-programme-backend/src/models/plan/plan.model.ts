import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Plan {
  id?: string | undefined | null = null;

  @Prop()
  date: Date;

  @Prop()
  time: number;

  @Prop()
  completed: boolean;

  @Prop()
  timeSpent: number;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
