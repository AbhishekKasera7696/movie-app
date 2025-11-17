import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `8b4491d775dfcd4a70a30ac527922c1031023e74a5ecd69f7e94dd13477919bf6a899c92a94c34eb2edd9c04f458c8d50eb344215b671b41111a541c
59dde72b`, 
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
