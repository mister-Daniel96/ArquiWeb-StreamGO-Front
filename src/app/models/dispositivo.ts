export class Dispositivo  {
    idDispositivo : number = 0;
    nameDispositivo : string = '';
    typeDispositivo : string = '';
    brandDispositivo : string = '';
    modelDispositivo : string = '';
    dateRegistro: Date = new Date(Date.now());
    membresia: Membresia  = new Membresia ();
  }
  