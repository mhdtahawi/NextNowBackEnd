import * as bcrypt from 'bcrypt';
import {CreatedUser, CreateUserDto} from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import {User} from '../interfaces/users.interface';
import {isEmptyObject} from '../utils/util';
import UsersStore from "../stores/users.store";

class UserService {
  public usersStore = new UsersStore();

  public static extractUserWithoutPassword(user: User): CreatedUser
  {
    const {password, ...createdUser} = user;
    return createdUser;
  }

  public async findUserById(userId: number): Promise<CreatedUser> {
    const findUser: User = await this.usersStore.findUserById(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return UserService.extractUserWithoutPassword(findUser);
  }

  public async createUser(userData: CreateUserDto, wallet: string): Promise<CreatedUser> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.usersStore.findUserByEmailOrUsername(userData.email, userData.username);
    if (findUser && findUser.email === userData.email) throw new HttpException(409, `Your email ${userData.email} already exists`);
    if (findUser && findUser.username === userData.username) throw new HttpException(409, `Your username ${userData.username} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.usersStore.createNewUser({ ...userData, password: hashedPassword, walletId: wallet});
    return UserService.extractUserWithoutPassword(createUserData);
  }

  public async updateUser(userId: number, userData: User): Promise<CreatedUser> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUser: User = await this.usersStore.updateUser({ ...userData, password: hashedPassword }, userId);
    if (!updateUser) throw new HttpException(409, "You're not user");

   return UserService.extractUserWithoutPassword(updateUser);
  }

  public async deleteUserData(userId: number): Promise<void> {
    await this.usersStore.removeUser(userId);
    return;
  }
}

export default UserService;