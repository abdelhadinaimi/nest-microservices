import { RequestMethod } from '@nestjs/common';
import { IRoute } from '../app.types';

export const ROUTES: IRoute[] = [
  { path: '/medias/:id', protected: false, method: RequestMethod.GET },
  { path: '/medias/:id', protected: true, method: RequestMethod.POST },
  { path: '/medias/:id', protected: true, method: RequestMethod.PUT },
  { path: '/medias/', protected: true, method: RequestMethod.GET },
  { path: '/medias/', protected: true, method: RequestMethod.POST },
]