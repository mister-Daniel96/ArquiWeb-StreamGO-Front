import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwtRequest';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
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
  id: number = 1;
  constructor(
    private loginService: LoginService,
    private router: Router,

    private formBuilder: FormBuilder, //=======FORM
    private snackBar: MatSnackBar, //me causa error
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    //PARA EL FORM
    this.form = this.formBuilder.group({
      nameUsuario: [],
      passwordUsuario: [],
    });
  }
  login() {
    let request = new JwtRequest();
    /* request.nameUsuario = this.username;
    request.passwordUsuario = this.password; */
    request.nameUsuario = this.form.value.nameUsuario.trim(); // FORM
    request.passwordUsuario = this.form.value.passwordUsuario.trim(); //FORM
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);

        this.captureId(request.nameUsuario).then((data) => {
          //es que es asincrono
          if (data != null) {
            this.id = data;
            console.log(this.id);
          }

          if (this.loginService.showRole() == 'user') {
            this.router.navigate([`components/client/${this.id}`]);
          } else if (this.loginService.showRole() == 'admin') {
            this.router.navigate([`components/administrator/${this.id}`]);
          }
        });
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.mensaje += this.username + this.password;
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
        // alert(this.mensaje);
      }
    );
  }

  captureId(username: string) {
    return new Promise<number | null>((resolve, reject) => {
      this.uS.list().subscribe(
        (data: Usuario[]) => {
          const user = data.find(
            (usuario: Usuario) => usuario.nameUsuario === username
          );

          if (user) {
            resolve(user.idUsuario);
          } else {
            resolve(null); // Retorna null si no se encuentra el usuario
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
