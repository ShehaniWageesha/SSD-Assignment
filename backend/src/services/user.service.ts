import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../models/user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,){}

    async signup(user: User) : Promise<User> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const reqBody = {
            userName: user.userName,
            userEmail: user.userEmail,
            userBirthday: user.userBirthday,
            userGender : user.userGender,
            password: hash,
            userPhone: user.userPhone,
            userAddress: user.userAddress,
            userType: user.userType,
            createdDate : user.createdDate
        }
        const newUser = new this.userModel(reqBody);
        return newUser.save();
    }

    async signin(user: User, jwt: JwtService): Promise<any> {
        const foundUser = await this.userModel.findOne({userEmail: user.userEmail}).exec();
        if(foundUser) {
            const { password } = foundUser;
            if(bcrypt.compare(user.password, password)) {
                const payload = {userEmail: user.userEmail};
                const { userType } = foundUser;
                const { _id } = foundUser;
                return {
                    token: jwt.sign(payload),
                    userEmail: payload.userEmail,
                    userType : userType,
                    userId : _id
                };
            }
            return new HttpException('Incorrect Username or Password!', HttpStatus.UNAUTHORIZED )
        }
        return new HttpException('Incorrect Username or Password!', HttpStatus.UNAUTHORIZED )
    }

    async getOne(userEmail): Promise<User> {
        return await this.userModel.findOne({ userEmail }).exec();
    }

    async getAll(): Promise<any> {
        return await this.userModel.find();
    }
}