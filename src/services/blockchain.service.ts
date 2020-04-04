import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmptyObject } from '../utils/util';

class BlockchainService {
    public users = userModel;

    public async createWallet(): Promise<string> {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;
    }

    public async getWalletBalance(): Promise<string> {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;
    }
}

export default BlockchainService;
