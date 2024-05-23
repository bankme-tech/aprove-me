import { AuthService } from '@/auth/auth.service'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers

    if (!authorization) {
      throw new UnauthorizedException()
    }
    const [_, token] = authorization.split(' ')

    try {
      const data = await this.authService.checkToken(token)
      if (!data) {
        throw new UnauthorizedException()
      }
      request.session = data

      return true
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
