import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Support } from 'src/app/models/support';
import { SupportService } from 'src/app/services/support.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-supports-client',
  templateUrl: './supports-client.component.html',
  styleUrls: ['./supports-client.component.css'],
})
export class SupportsClientComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  support: Support = new Support();
  mensaje: string = '';

  maxFecha: Date = moment().toDate();

  idParent:number=0;
  constructor(
    private sS: SupportService,
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    
    this.route.parent?.params.subscribe(data=>{
      this.idParent=data['id'];
    })

    this.form = this.formBuilder.group({
      dateSupport: ['', Validators.required],
      descriptionSupport: ['', Validators.required],
      usuario: [''],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.support.dateSupport = this.form.value.dateSupport;
      this.support.descriptionSupport = this.form.value.descriptionSupport;
      /* this.support.usuario.idUsuario = this.form.value.usuario; */
      this.support.usuario.idUsuario = this.idParent;

      this.sS.insert(this.support).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });

      this.router.navigate([`/components/client/${this.idParent}`]);
    } else {
      this.mensaje = 'Ingrese todos los datos!!!';
    }
  }

  obtenerControlCampo(nombreCampo: string) {
    const control = this.form.get(nombreCampo);

    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
