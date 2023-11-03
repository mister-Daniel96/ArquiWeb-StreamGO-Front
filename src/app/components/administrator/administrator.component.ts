import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent {
  panelOpenState = false;
/* ES COMO SI FUERA EL DESSERT */
  constructor(public route:ActivatedRoute){

  }
}
