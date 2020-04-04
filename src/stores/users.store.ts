import userModel from '../models/users.model';
import {User} from "../interfaces/users.interface";
import {Op, where} from "sequelize";

class UsersStore {
    private users = userModel;

    public async createNewUser(user:Omit<User, "id">):Promise<User> {
        return this.users.create(user);
    }
    public async findUserByEmailOrUsername(email: string, username: string): Promise<User>
    {
        return this.users.findOne({
            where: {
                [Op.or]: {
                    email: email,
                    username: username
                }
            }
        });
    }

    public async findUserById(userId: number): Promise<User> {
        return this.users.findByPk(userId);
    }

    public async updateUser(userData: Omit<User, "id">, id: number ) : Promise<User> {
        return this.users.update(userData, { where: { id: id } });
    }

    public async removeUser(id: number): Promise<void> {
        this.users.destroy({where: {id: id}});
    }
}

export default UsersStore