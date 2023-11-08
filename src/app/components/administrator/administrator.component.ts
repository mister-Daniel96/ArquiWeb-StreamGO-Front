import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
})
export class AdministratorComponent implements OnInit {

  



  /* ES COMO SI FUERA EL DESSERT */
  id: number = 0;
  active: boolean = false;
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {
    //ES PARA AGREGAR EL ID A LA RUTA ES DECIR  administrator/:id
    //las url que se usa en el menu es es    administrator/1/supports
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.active = data['id'] !== null;
    });
  }
}
