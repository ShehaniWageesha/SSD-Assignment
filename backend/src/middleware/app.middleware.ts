import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/user.service';

interface UserRequest extends Request {
    user: any
}

@Injectable()
export class isAuthenticated implements NestMiddleware {
    constructor(private readonly jwt: JwtService, private readonly userService: UserService){}

    async use(req: UserRequest, res: Response, next: NextFunction) {
        try{
            if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
                const token = req.headers.authorization.split(' ')[1];
                const decoded = await this.jwt.verify(token);
                const user = await this.userService.getOne(decoded.userEmail)
                
                if(user) {
                    req.user = user
                    next()
                } else {
                    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
                }
            }else {
                throw new HttpException('Token Not Found!', HttpStatus.NOT_FOUND);
            }
        } catch {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }
}
