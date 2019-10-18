import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../interfaces/user.interface";


export class UserRepository {

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser: IUser = await new this.userModel(createUserDto).save();
    return new User(createdUser._id);
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }
}