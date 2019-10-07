import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MATH_SERVICE } from './app.constants';
import { ArrayDto } from './array.dto';

@Injectable()
export class AppService {

  constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}

  async sum(array: ArrayDto): Promise<number> {
    const pattern = { cmd: 'sum' };
    const data = array.data;
    const response = await this.client.send<number>(pattern,data);
    return response.toPromise();  
  }
}
