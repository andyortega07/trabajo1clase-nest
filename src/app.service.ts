import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'El servidor de gestión de inventario está funcionando.';
  }
}
