import { ListaDeReproduccion } from './listaDeReproduccion';

export class Contenido {
  idContenido: number = 0;
  titleContenido: string = '';
  descripContenido: string = ''; 
  yearContenido: Date = new Date(Date.now());
  directorContenido: string = '';
  typeContenido: string = '';
  genderContenido: string = '';
  originCountryContenido: string = '';
  urlContenido: string = '';
  urlImageContenido: string = '';
  languageContenido: string = '';
  listadereproduccion?: ListaDeReproduccion | null = null;

  /* listadereproduccion?:ListaDeReproduccion|null=null; */
}
