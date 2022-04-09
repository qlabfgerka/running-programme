import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user/user.model';

@Injectable()
export class DtoFunctionsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async userToDTO(user: User): Promise<User> {
    if (!user) return undefined;
    const userDTO: User = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    return userDTO;
  }

  private async getUser(user: User): Promise<User> {
    if (!user) return undefined;
    if (user.username) return await this.userModel.findById(user.id);
    return await this.userModel.findById(user.toString());
  }
}
