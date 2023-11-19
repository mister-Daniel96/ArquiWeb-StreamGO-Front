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
import * as bcrypt from 'bcryptjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true; //es para el password

  contrasenaPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //TODO ES PARA LA VALIDACION DEL CORREO
  form: FormGroup = new FormGroup({});
  usuarioNuevo: Usuario = new Usuario();
  enabledUser: boolean = true;
  mensaje: string = '';
  constructor(
    private rS: RegisterService,
    private FormBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.form = this.FormBuilder.group({
      nameUsuario: ['', [Validators.required]],
      passwordUsuario: ['', [Validators.required,Validators.pattern(this.contrasenaPattern)]],
      emailUsuario: ['', [Validators.required, Validators.email]],
      enabledUsuario: [],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.usuarioNuevo.nameUsuario = this.form.value.nameUsuario.trim();
      this.usuarioNuevo.passwordUsuario = bcrypt.hashSync(
        this.form.value.passwordUsuario.trim(),
        12
      );
      this.usuarioNuevo.emailUsuario = this.form.value.emailUsuario.trim();
      this.usuarioNuevo.enabledUsuario = this.enabledUser;
      console.log(this.usuarioNuevo.nameUsuario);
      console.log(this.usuarioNuevo.passwordUsuario);
      console.log(this.usuarioNuevo.emailUsuario);
      console.log(this.usuarioNuevo.enabledUsuario);

      this.rS.insert(this.usuarioNuevo).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.snackbar.open('Usted fue registrado con exito!!! ', 'Aviso', {
        duration: 2000,
      });
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2500);
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

  error(){
    this.snackbar.open('Usted fue registrado con exito!!! ', 'Aviso', {
      duration: 2000,
    });
  }
}
