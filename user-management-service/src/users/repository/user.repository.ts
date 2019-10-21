import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { ErrorMessages } from "../users.constants";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Logger } from "@nestjs/common";
import { MongoError } from "mongodb";
import { Code } from "bson";


export class UserRepository {

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser: IUser = await new this.userModel(createUserDto).save();
      return new User(createdUser._id);
    } catch (error) {
      if (error instanceof MongoError) {
        if (error.code === 11000) { // duplicate key error
          const possibleErrorsKeys = Object.keys(error["keyPattern"]);
          throw new Error(possibleErrorsKeys[0] === "email" ?
            ErrorMessages.EMAIL_EXISTS : ErrorMessages.USERNAME_EXISTS);
        }
      }
    }
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser: IUser = await this.userModel
        .findOneAndUpdate({ _id: updateUserDto._id }, { $set: updateUserDto })
        .exec();
      if (!updatedUser) {
        throw new Error(ErrorMessages.USER_NOT_FOUND);
      }
      return new User(updatedUser._id);
    } catch (error) {
      let errorMsg = error.message;
      if (error instanceof MongoError) {
        if (error.code === 11000) { // duplicate key error
          const possibleErrorsKeys = Object.keys(error["keyPattern"]);
          errorMsg = possibleErrorsKeys[0] === "email" ?
            ErrorMessages.EMAIL_EXISTS : ErrorMessages.USERNAME_EXISTS;
        }
      }
      throw new Error(errorMsg);
    }
  }

  async findUserById(id: String): Promise<IUser> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }
    return user;
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }
}