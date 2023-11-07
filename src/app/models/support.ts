import { Usuario } from './usuario';

export class Support {
  idSupport: number = 0;
  dateSupport: Date = new Date(Date.now());
  descriptionSupport: string = '';
  usuario: Usuario = new Usuario();
}
