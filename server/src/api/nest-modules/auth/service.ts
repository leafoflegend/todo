import { Inject, Injectable } from '@nestjs/common';
import CONSTANTS from '../../../constants';
import { Logger } from '../../../utils';
import { SequelizeProvider } from '../databases/sequelize';
import { LoginDTO } from './dto';

const l = new Logger('health service');

@Injectable()
class AuthService {
  private readonly SEQUELIZE: SequelizeProvider;

  public constructor(@Inject(CONSTANTS.SEQUELIZE) SEQUELIZE) {
    this.SEQUELIZE = SEQUELIZE;
  }

  public checkUserCredentials = async (userCredentials: LoginDTO): Promise<InstanceType<SequelizeProvider["models"]["User"]>> => {
    const { User } = this.SEQUELIZE.models;

    const authenticatedUser = await User.authenticateUser(userCredentials);

    return authenticatedUser;
  };
}

export default AuthService;
