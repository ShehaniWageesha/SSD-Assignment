import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { response } from "express";
import { User } from "src/models/user.schema";
import { UserService } from "src/services/user.service";


@Controller('/api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService, private jwtService: JwtService){}

    @Post('/signup')
        async SignUp(@Res() response, @Body() user : User){
            const newUser = await this.userService.signup(user);
            return response.status(HttpStatus.CREATED).json({
                newUser
            })
        }
    
    @Post('/signin')
        async SignIn(@Res() response, @Body() user: User){
            const token = await this.userService.signin(user, this.jwtService);
            return response.status(HttpStatus.OK).json(token);
        }
    @Get('/allUsers')
        async getAllUsers(@Res() response){
            const userData = await this.userService.getAll();
            return response.status(HttpStatus.OK).json(userData);
        }
        
}