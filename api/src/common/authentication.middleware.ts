import {NestMiddleware, Injectable} from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {

  constructor (private readonly config: ConfigService) { }

  use(req, res, next) {
    jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${this.config.get('AUTH0_DOMAIN')}/.well-known/jwks.json`,
      }),

      audience: 'http://localhost:3000',
      issuer: `https://${this.config.get('AUTH0_DOMAIN')}/`,
      algorithm: 'RS256',
    })(req, res, err => {
      if (err) {
        const status = err.status || 500;
        const message =
          err.message || 'Sorry, we were unable to process your request.';
        return res.status(status).send({
          message,
        });
      }
      next();
    });
  };
}