import { Component } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-client',
  templateUrl: './card-client.component.html',
  styleUrls: ['./card-client.component.css']
})
export class CardClientComponent {

  cardData: Card = {
    idCard: 0, // Puedes inicializar con un valor predeterminado o dejar en blanco
    typeCard: 'Debito', // Ajusta según tus necesidades
    numCard: '',
    nameCard: '',
    MM: 0,
    YY: 0,
    cvvCard: 0
  };

  showIdField: boolean = true;

  constructor(private cS: CardService){}

  registrarTarjeta(cardData: any) {
    const nuevaTarjeta: Card = {
      idCard: cardData.idCard,
      typeCard: cardData.typeCard,
      numCard: cardData.numCard,
      nameCard: cardData.nameCard,
      MM: cardData.MM,
      YY: cardData.YY,
      cvvCard: cardData.cvvCard
    };

    this.cS.insert(nuevaTarjeta).subscribe(
      (response) => {
        console.log('Tarjeta registrada exitosamente', response);
        // Puedes realizar acciones adicionales después del registro
      }
    );
  }
  getFormattedCardNumber() {
    // Puedes agregar lógica para formatear el número de tarjeta según tus necesidades
    // Aquí solo se muestra el número tal como está en el modelo
    return this.cardData.numCard;
  }

  getBankLogo() {
    // Puedes agregar lógica para determinar el logo del banco según el tipo de tarjeta
    // y devolver la ruta de la imagen correspondiente
    return 'ruta/al/logo/banco.png';
  }

  onlyNumbers(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }

}
