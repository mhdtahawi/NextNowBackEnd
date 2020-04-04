import {NextFunction, Request, Response} from 'express';
import {CreateUserDto} from '../dtos/users.dto';
import AuthService from '../services/auth.service';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const { token, user } = await this.authService.login(userData);
      res.status(200).json({ data: user, token: token, message: 'login' });
    } catch (error) {
      next(error);
    }
  }

}

export default AuthController;
