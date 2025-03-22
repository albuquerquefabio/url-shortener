import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRoles } from '../interfaces/users.interface';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  })
  @IsNotEmpty()
  name!: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, 'Username must be unique'],
    required: [true, 'Username is required'],
  })
  @IsNotEmpty()
  username!: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v: string) => /\S+@\S+\.\S+/.test(v),
      message: (props) => `${props.value} is not a valid email`,
    },
    unique: [true, 'Email must be unique'],
    required: [true, 'Email is required'],
  })
  @IsEmail()
  email!: string;

  @Prop({
    type: String,
    required: [true, 'Password is required'],
  })
  password!: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  status?: boolean;

  @Prop({
    type: [String],
    enum: Object.values(UserRoles),
    default: [UserRoles.USER],
  })
  roles?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ status: 1, roles: 1 });
UserSchema.index({ status: 1, username: 1 });
UserSchema.index({ status: 1, email: 1 });
