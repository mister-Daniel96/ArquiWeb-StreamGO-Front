import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-users-administrator',
  templateUrl: './list-users-administrator.component.html',
  styleUrls: ['./list-users-administrator.component.css'],
})
export class ListUsersAdministratorComponent implements OnInit {
 
  constructor() {}
  ngOnInit(): void {
   
  }

  filter(en: any) {
    /* this.dataSourceClient.filter = en.target.value.trim()
    this.dataSourceClient.filterPredicate = (data: Usuario, filter: string) => {
      return data.nameUsuario.includes(filter);
    }; */
  }
}
