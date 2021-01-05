import { HttpException, HttpStatus, Injectable, NestMiddleware, Request, Response,Next } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import environment from 'src/environment';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(@Request() req, @Response() res, @Next() next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, environment.token)
      req.user = user;
    } else {
      throw new HttpException('Error',HttpStatus.FORBIDDEN);
    }
    next();
    
  }
}
