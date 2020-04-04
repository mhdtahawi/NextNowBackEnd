import { NextFunction, Request, Response } from 'express';
import {CreatedUser, CreateUserDto} from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';
import UserService from '../services/users.service';
import BlockchainService from "../services/blockchain.service";

class UsersController {
  public userService = new UserService();
  public blockchainService = new BlockchainService();

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id);

    try {
      const findOneUserData: CreatedUser = await this.userService.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  }

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const wallet = await this.blockchainService.createWallet();
      const createUserData: CreatedUser = await this.userService.createUser(userData, wallet);
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id);
    const userData: User = req.body;

    try {
      const updateUserData: CreatedUser = await this.userService.updateUser(userId, userData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id);

    try {
      await this.userService.deleteUserData(userId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
