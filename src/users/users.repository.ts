import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async createOne(params: Partial<User>): Promise<User> {
    const newUser = new this.userModel({ ...params });
    await newUser.save();
    return newUser;
  }

  async updateOne(
    queryFilter: FilterQuery<Partial<User>>,
    updateData: UpdateQuery<Partial<User>>,
  ) {
    return await this.userModel.findOneAndUpdate(queryFilter, updateData, {
      new: true,
    });
  }
}