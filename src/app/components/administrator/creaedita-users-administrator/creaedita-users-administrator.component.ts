import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-creaedita-users-administrator',
  templateUrl: './creaedita-users-administrator.component.html',
  styleUrls: ['./creaedita-users-administrator.component.css'],
})
export class CreaeditaUsersAdministratorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  mensaje: string = '';

  id: number = 0;
  edicion: boolean = false;
  idPantent: number = 0;
  enabledTypes: { value: string; viewValue: string }[] = [
    { value: 'true', viewValue: 'Enabled' },
    { value: 'false', viewValue: 'Disabled' },
  ];
  hide = true;
  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /* email = new FormControl('', [Validators.required, Validators.email]); */

  ngOnInit(): void {
    //captura parametros
    this.route.parent?.params.subscribe((data) => {
      this.idPantent = data['id'];
    });
    //capturando de la variable hijo
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] !== null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idUsuario: [''],
      nameUsuario: ['', Validators.required, Validators.toString],
      passwordUsuario: ['', Validators.required],
      emailUsuario: ['', Validators.required, Validators.email],
      enabledUsuario: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.idUsuario;
      this.usuario.nameUsuario = this.form.value.nameUsuario;
      this.usuario.passwordUsuario = this.form.value.passwordUsuario;
      this.usuario.emailUsuario = this.form.value.emailUsuario;
      this.usuario.enabledUsuario = this.form.value.enabledUsuario;

      if (this.edicion) {
        this.uS.update(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }

      this.router.navigate([`/administrator/${this.idPantent}/list-users`]);
    } else {
      this.mensaje = 'Ingrese todos los datos e ingrese los datos correctos!!';
    }
  }
  obtenerControlCampo(nombreCampo: string) {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUsuario: new FormControl(data.idUsuario),
          nameUsuario: new FormControl(data.nameUsuario),
          passwordUsuario: new FormControl(data.passwordUsuario),
          emailUsuario: new FormControl(data.emailUsuario),
          enabledUsuario: new FormControl(data.enabledUsuario),
        });
      });
    }
  }
}
