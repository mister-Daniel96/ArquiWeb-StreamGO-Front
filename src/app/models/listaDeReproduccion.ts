import { Contenido } from './contenido';
import { Usuario } from './usuario';

export class ListaDeReproduccion {
  idListaDeReproduccion: number = 0;
  nameListaDeReproduccion: string = '';
  usuario: Usuario = new Usuario();
  contenido: Contenido = new Contenido();
}
