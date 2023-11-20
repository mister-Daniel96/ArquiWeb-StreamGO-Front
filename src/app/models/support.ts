import { Usuario } from './usuario';

export class Support {
  idSupport: number = 0;
  dateSupport: Date = new Date(Date.now());
  descriptionSupport: string = '';
  pendienteSupport:boolean=true;
  usuario: Usuario = new Usuario();
}
