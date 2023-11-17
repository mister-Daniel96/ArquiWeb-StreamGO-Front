import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  /*   showFiller = false;
   */
  id: number = 0;
  constructor(public route: ActivatedRoute,private loginService:LoginService) {}
role:string='';
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
    });
  }
//
  cerrar() {
    sessionStorage.clear();
  }
  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  validarRol() {
    if (this.role == 'admin' || this.role == 'user') {
      return true;
    } else {
      return false;
    }
  }
}
