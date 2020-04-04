import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import {DataStoredInToken, RequestWithUser} from '../interfaces/auth.interface';
import UsersStore from "../stores/users.store";

async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  const userStore = new UsersStore();
  if (token) {
    const secret = process.env.JWT_SECRET;

    try {
      const verificationResponse = jwt.verify(token, secret) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await userStore.findUserById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  } else {
    next(new HttpException(404, 'Authentication token missing'));
  }
}

export default authMiddleware;
