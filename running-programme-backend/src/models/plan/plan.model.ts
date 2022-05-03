import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Plan {
  id?: string | undefined | null = null;

  @Prop()
  date: Date;

  @Prop()
  time: number;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
