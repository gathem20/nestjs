import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({unique: [true , 'this email already exists']})
  password: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User)