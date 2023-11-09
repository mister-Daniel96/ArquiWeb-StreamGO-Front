import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true; //es para el password

  //TODO ES PARA LA VALIDACION DEL CORREO
  form: FormGroup = new FormGroup({});
  usuarioNuevo: Usuario = new Usuario();
  enabledUser: boolean = true;
  mensaje: string = '';
  constructor(
    private rS: RegisterService,
    private FormBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.FormBuilder.group({
      nameUsuario: ['',Validators.required],
      passwordUsuario: ['',Validators.required],
      emailUsuario: ['',Validators.required],
      enabledUsuario: [],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.usuarioNuevo.nameUsuario = this.form.value.nameUsuario;
      this.usuarioNuevo.passwordUsuario = this.form.value.passwordUsuario;
      this.usuarioNuevo.emailUsuario = this.form.value.emailUsuario;
      this.usuarioNuevo.enabledUsuario = this.enabledUser;
console.log(this.usuarioNuevo.nameUsuario)
console.log(this.usuarioNuevo.passwordUsuario)
console.log(this.usuarioNuevo.emailUsuario)
console.log(this.usuarioNuevo.enabledUsuario)

      this.rS.insert(this.usuarioNuevo).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });

      this.router.navigate(['/login']);
    } else {
      this.mensaje = 'ingrese los datos correctos!!!';
    }
  }
  obtenerControlCampo(nombreCampo: string) {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
