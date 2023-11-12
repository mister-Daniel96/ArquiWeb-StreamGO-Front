import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwtRequest';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true; //es para el password

  username: string = '';
  password: string = '';
  mensaje: string = '';
  form: FormGroup = new FormGroup({}); //============== FORM
  constructor(
    private loginService: LoginService,
    private router: Router,

    private formBuilder: FormBuilder,//=======FORM
      private snackBar: MatSnackBar//me causa error
  ) {}

  ngOnInit(): void {
    //PARA EL FORM
    this.form = this.formBuilder.group({
      nameUsuario: [],
      passwordUsuario: []
    });
  }
  login() {



    let request = new JwtRequest();
    /* request.nameUsuario = this.username;
    request.passwordUsuario = this.password; */
    request.nameUsuario=this.form.value.nameUsuario; // FORM
    request.passwordUsuario=this.form.value.passwordUsuario; //FORM
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        if (this.loginService.showRole() == 'user') {
          this.router.navigate(['components/client/2']);
        } else if (this.loginService.showRole() == 'admin') {
          this.router.navigate(['components/administrator/1']);
        }
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.mensaje += this.username + this.password;
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
       // alert(this.mensaje);
      }
    );
  }
}
