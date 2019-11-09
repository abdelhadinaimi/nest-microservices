import { RequestMethod } from "@nestjs/common";

export type IRoute = {
  path: string;
  protected: boolean;
  method: RequestMethod
}