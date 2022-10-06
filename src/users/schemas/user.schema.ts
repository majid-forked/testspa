import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

export interface IUser{
  _id:Types.ObjectId;
 email: string;
 pecuniary: number;
 image: string;
 password: string;
 created_at: Date;
}

@Schema({ versionKey: false })
export class User extends Document implements IUser{

  @Prop({ type: String, required: true,unique:true })
  email: string;

  @Prop({ type: Number, required: true })
  pecuniary: number;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Date, default: new Date() })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
