import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './schemas/user.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findById(id: string): Promise<IUser> {
    return this.userModel.findById(id).lean();
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email }).lean();
  }

  async createOne(params: Partial<IUser>): Promise<IUser> {
    const newUser = new this.userModel({ ...params });
    await newUser.save();
    return newUser;
  }

  async updateOne(
    queryFilter: FilterQuery<Partial<IUser>>,
    updateData: UpdateQuery<Partial<IUser>>,
  ) {
    return await this.userModel.findOneAndUpdate(queryFilter, updateData, {
      new: true,
    }).lean();
  }
}
