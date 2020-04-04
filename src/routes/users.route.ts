import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware'
class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto), this.usersController.createUser);

    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.usersController.getUserById);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(CreateUserDto, true), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.usersController.deleteUser);
  }
}

export default UsersRoute;
