import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<any>) {}

  async createUsers(createCatDto: any): Promise<any> {
    const existingUser = await this.userModel.findOne({
      user_email: createCatDto.user_email,
    });
    if (existingUser) {
      return { status: false, message: 'User already exists' };
    }
    const createdUser = new this.userModel({ ...createCatDto });
    return {
      status: true,
      data: createdUser.save(),
    };
  }

  async getAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async getUserByEmail(userEmail: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ user_email: userEmail }).exec();
  }

}
