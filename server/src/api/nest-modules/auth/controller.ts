import { Controller, Post, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { Logger } from '../../../utils';
import CONSTANTS from '../../../constants';
import AuthService from './service';
import { LoginDTO } from './dto';

interface AuthResponse {
  keys: string[];
  message: string;
  userDetails?: {
    id: string;
    name: string;
    email: string;
  };
}

const l = new Logger('health controller');

@Controller('auth')
class AuthController {
  private readonly authService: AuthService;

  public constructor(healthService: AuthService) {
    this.authService = healthService;
  }

  @Post('login')
  private async login(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<AuthResponse> {
    try {
      const { body: loginDTO }: { body: LoginDTO } = req;

      const user = await this.authService.checkUserCredentials(loginDTO);

      const decidedSession = await user.associateSession(req.session.id);

      res.cookie(CONSTANTS.COOKIE_NAME, decidedSession.id, {
        maxAge: 1000 * 60 * 60 * 24 * 31,
        path: '/',
        httpOnly: true,
      });
      res.status(200);
      return {
        keys: ['message', 'userDetails'],
        message: 'Successfully Logged In!',
        userDetails: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (e) {
      l.info(`Failed login for session ${req.session.id}`, req.body);
      res.status(401);
      return {
        keys: ['message'],
        message: 'Failed to login with provided credentials.',
      };
    }
  }
}

export default AuthController;
