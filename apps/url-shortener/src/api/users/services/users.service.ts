import { UpdateUserDto } from '../dto/update-user.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUsersService } from '../interfaces/users.interface';
import { hashPassword, checkPassword, isId } from '../../../utils/utility';

@Injectable()
export class UsersService implements IUsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, username, email, password } = createUserDto;

    if (!name || !email || !password) {
      throw new Error('Missing required fields');
    }

    await this.hasUser({ username, email });

    const hashedPassword = await this.hashPassword(password);

    const user = new this.userModel({
      name,
      email,
      username,
      password: hashedPassword,
    });

    return await user.save();
  }

  async findAll(): Promise<Array<User>> {
    return this.userModel.find({ status: true }).select('-password').exec();
  }

  async findOne(
    id: string,
    select?: Partial<Record<keyof User, boolean>>
  ): Promise<Partial<User>> {
    const user = await this.userModel
      .findOne(
        {
          $or: [
            ...(isId(id) ? [{ _id: id, status: true }] : []),
            { username: id, status: true },
            { email: id, status: true },
          ],
        },
        {
          ...(select ? select : {}),
        }
      )
      .lean()
      .exec();

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id).lean().exec();

    if (!user) throw new NotFoundException('User not found.');

    if (updateUserDto.username)
      await this.hasUser({ username: updateUserDto.username });

    if (updateUserDto.password && updateUserDto.oldPassword) {
      await this.checkPassword(updateUserDto.oldPassword, user.password);
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    Object.assign(user, updateUserDto);

    return await user.save();
  }

  async delete(id: string): Promise<void> {
    const user = await this.userModel.findById(id).select('_id').lean().exec();
    if (!user) throw new NotFoundException('User not found');

    await this.userModel.findByIdAndUpdate(id, { status: false });
  }

  private async hasUser(
    identifier: Partial<Pick<CreateUserDto, 'username' | 'email'>>
  ): Promise<void> {
    if (identifier.email) {
      const existingUserByEmail = await this.userModel
        .findOne({ email: identifier.email })
        .exec();
      if (existingUserByEmail) {
        throw new ConflictException('Email already in use.');
      }
    }

    if (identifier.username) {
      const existingUserByUsername = await this.userModel
        .findOne({ username: identifier.username })
        .exec();
      if (existingUserByUsername) {
        throw new ConflictException('Username already in use.');
      }
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await hashPassword(password);
  }

  private async checkPassword(password: string, hashed: string): Promise<void> {
    await checkPassword(password, hashed);
  }
}
