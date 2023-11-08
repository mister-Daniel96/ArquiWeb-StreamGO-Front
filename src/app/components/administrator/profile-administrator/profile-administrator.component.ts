import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile-administrator',
  templateUrl: './profile-administrator.component.html',
  styleUrls: ['./profile-administrator.component.css'],
})
export class ProfileAdministratorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();

  id: number = 0;
  active = false;
  hide = true;
  constructor(
    private uS: UsuarioService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    // PARA ACCEDER A LA RUTA ACTUAL SI TENGO
    /* this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.active = data['id'] !== null;
      this.init();
    }); */

    //PARA ACCEDER A LA URL DEL PADRE
     this.route.parent?.params.subscribe((data) => {
      this.id = data['id'];
      this.active = data['id'] !== null;
      // Usa this.parentId según sea necesario
      this.init();
    }); 

    //Aqui defino como sera el formulario sin esto no me aparece todo lo del init
    this.form = this.formBuilder.group({
      idUsuario: [],
      nameUsuario: [],
      passwordUsuario: [],
      emailUsuario: [],
      enabledUsuario: [],
    });
  }

  init() {
    if (this.active) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUsuario: new FormControl(data.idUsuario),
          nameUsuario: new FormControl(data.nameUsuario),
          passwordUsuario: new FormControl(data.passwordUsuario),
          emailUsuario: new FormControl(data.emailUsuario),
          enabledUsuario: new FormControl(data.enabledUsuario),
        });
        this.usuario.idUsuario = data.idUsuario;
      });
    }
  }
}
