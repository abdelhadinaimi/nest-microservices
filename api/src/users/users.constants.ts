import { RequestMethod } from '@nestjs/common';
import { IRoute } from '../app.types';

export const ROUTES: IRoute[] = [
  { path: '/users/:id', protected: false, method: RequestMethod.GET },
  { path: '/users/:id', protected: true, method: RequestMethod.POST },
  { path: '/users/:id', protected: true, method: RequestMethod.PUT },
  { path: '/users/', protected: true, method: RequestMethod.GET },
  { path: '/users/', protected: true, method: RequestMethod.POST },
]