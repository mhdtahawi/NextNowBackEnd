import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {CreatedUser, CreateUserDto} from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import {DataStoredInToken, TokenData} from '../interfaces/auth.interface';
import {User} from '../interfaces/users.interface';
import {isEmptyObject} from '../utils/util';
import UserStore from "../stores/users.store";
import UserService from "./users.service";

class AuthService {

  public userStore = new UserStore();

  public async login(userData: CreateUserDto): Promise<{ token: TokenData, user: CreatedUser }> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.userStore.findUserByEmailOrUsername( userData.email, userData.username);
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const token = this.createToken(findUser);
    const user:CreatedUser = UserService.extractUserWithoutPassword(findUser);
    return { token,  user };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
