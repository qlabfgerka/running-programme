import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  id?: string | undefined | null = null;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password?: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  refreshTokenExpiry?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
