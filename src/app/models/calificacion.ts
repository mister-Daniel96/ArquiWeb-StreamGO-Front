import { Contenido } from "./contenido";
import { Usuario } from "./usuario";

export class Calificacion {
  idCalificacion: number = 0;
  score: number = 0;
  contenido: Contenido = new Contenido();
  usuario: Usuario = new Usuario();
}
