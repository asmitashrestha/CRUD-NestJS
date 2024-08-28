import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})

export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: [true, 'User already exists'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  confirmPassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
