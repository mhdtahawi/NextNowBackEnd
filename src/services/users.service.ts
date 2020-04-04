import * as bcrypt from 'bcrypt';
import {CreatedUser, CreateUserDto} from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmptyObject } from '../utils/util';
import {Op} from 'sequelize'

class UserService {
  public users = userModel;

  private extractUserWithoutPassword(user: User): CreatedUser
  {
    const {password, ...createdUser} = user;
    return createdUser;
  }


  public async findUserById(userId: number): Promise<CreatedUser> {
    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return this.extractUserWithoutPassword(findUser);
  }

  public async createUser(userData: CreateUserDto, wallet: string): Promise<CreatedUser> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({
      where: {
        [Op.or]: {
          email: userData.email,
          username: userData.username
        }
      }
    });
    console.log("existing user check", findUser);
    if (findUser && findUser.email === userData.email) throw new HttpException(409, `Your email ${userData.email} already exists`);
    if (findUser && findUser.username === userData.username) throw new HttpException(409, `Your username ${userData.username} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    console.log("Inserting a new user", { ...userData, password: hashedPassword, walletId: wallet});
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword, walletId: wallet});
    return this.extractUserWithoutPassword(createUserData);
  }

  public async updateUser(userId: number, userData: User): Promise<CreatedUser> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUser: User = await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });
    if (!updateUser) throw new HttpException(409, "You're not user");

   return this.extractUserWithoutPassword(updateUser);
  }

  public async deleteUserData(userId: number): Promise<void> {
    const deleteUser: User = await this.users.destroy({ where: { id: userId } });
    if (!deleteUser) throw new HttpException(409, "You're not user");

    return;
  }
}

export default UserService;
