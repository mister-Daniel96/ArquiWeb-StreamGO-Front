import { Contenido } from "./contenido";
import { Usuario } from "./usuario";

export class Resena {
  idResena: number = 0;
  textResena: string = '';
  dateResena: Date = new Date(Date.now());
  usuario: Usuario = new Usuario();
  contenido: Contenido = new Contenido();
}
