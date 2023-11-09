import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css'],
})
export class ProfileClientComponent implements OnInit {
  hide = false;

  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();

  idParent: number = 0;
  active: boolean = true;
  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.idParent = data['id'];
      this.active = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idUsuario: [''],
      nameUsuario: [''],
      passwordUsuario: [''],
      emailUsuario: [''],
      enabledUsuaio: [''],
    });
  }

  init() {
    if (this.active) {
    this.uS.listId(this.idParent).subscribe(data=>{
      this.form=new FormGroup({
        idUsuario:new FormControl(data.idUsuario),
        nameUsuario:new FormControl(data.nameUsuario),
        passwordUsuario:new FormControl(data.passwordUsuario),
        emailUsuario:new FormControl(data.emailUsuario),
        enabledUsuario:new FormControl(data.enabledUsuario)
      })
    })
    }
  }
}
