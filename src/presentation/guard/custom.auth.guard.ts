/* istanbul ignore file */
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { config } from '@src/config';
import inversify from '@src/inversify/investify';
import { UserSession } from '@presentation/auth/jwt.strategy';
import { UserUsecaseModel } from '@usecase/user/model/user.usecase.model';

@Injectable()
export class CustomAuthGuard extends AuthGuard('jwt') {
  /* istanbul ignore next */
  async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const ctx = executionContext.switchToHttp();
    const request = ctx.getRequest<Request>();
    
    // Extraire le token de l'en-tête Authorization ou de la query string
    const token = this.extractTokenFromHeader(request) || this.extractTokenFromQuery(request);

    if (!token)
      throw new UnauthorizedException('Access token is not set');

    let userSession: UserSession;
    try {
      userSession = jwt.verify(token, config.jwt.secret) as UserSession;
    } catch (err) {
      throw new UnauthorizedException('Token expired');
    }

    const user: UserUsecaseModel = await inversify.getUserUsecase.execute({
      id: userSession.id,
    });

    if (user) {
      if (!user.active) throw new UnauthorizedException('User is deactivated');
    } else {
      throw new UnauthorizedException('User is not set');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers['authorization'];
    if (typeof authorizationHeader === 'string') {
      const match = authorizationHeader.match(/^Bearer\s(.+)$/);
      return match ? match[1] : undefined;
    }
    return undefined;
  }

  private extractTokenFromQuery(request: any): string | undefined {
    return request.query['token'] as string;
  }
}
