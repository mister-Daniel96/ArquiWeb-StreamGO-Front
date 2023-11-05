import { Contenido } from './../../../models/contenido';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as moment from 'moment';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-creaedita-movies-administrator',
  templateUrl: './creaedita-movies-administrator.component.html',
  styleUrls: ['./creaedita-movies-administrator.component.css'],
})
export class CreaeditaMoviesAdministratorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  contenido: Contenido = new Contenido();
  mensaje: string = '';

  maxFecha: Date = moment().add(-1, 'days').toDate();

  id: number = 0;
  edicion: boolean = false;

  types: { value: string; viewValue: string }[] = [
    { value: 'pelicula', viewValue: 'Pelicula' },
  ];
  languajes: { value: string; viewValue: string }[] = [
    { value: 'latino', viewValue: 'Latino' },
    { value: 'americano', viewValue: 'Americano' }
  ];
  genders: { value: string; viewValue: string }[] = [
    { value: 'pelicula', viewValue: 'Pelicula' },
    { value: 'comedia', viewValue: 'Comedia' },
    { value: 'drama', viewValue: 'Drama' },
    { value: 'accion', viewValue: 'Acción' },
    { value: 'terror', viewValue: 'Terror' }
  ];
  constructor(
    private cS: ContenidoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idContenido: [''],
      titleContenido: ['', Validators.required],
      descripContenido: ['', Validators.required],
      yearContenido: ['', Validators.required],
      directorContenido: ['', Validators.required],
      typeContenido: ['', Validators.required],
      genderContenido: ['', Validators.required],
      originCountryContenido: ['', Validators.required],
      urlContenido: ['', Validators.required],
      urlImageContenido: ['', Validators.required],
      languageContenido: ['', Validators.required],
      listadereproduccion: [''],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.contenido.idContenido = this.form.value.idContenido;
      this.contenido.titleContenido = this.form.value.titleContenido;
      this.contenido.descripContenido = this.form.value.descripContenido;
      this.contenido.yearContenido = this.form.value.yearContenido;
      this.contenido.directorContenido = this.form.value.directorContenido;
      this.contenido.typeContenido = this.form.value.typeContenido;
      this.contenido.genderContenido = this.form.value.genderContenido;
      this.contenido.originCountryContenido =
        this.form.value.originCountryContenido;
      this.contenido.urlContenido = this.form.value.urlContenido;
      this.contenido.urlImageContenido = this.form.value.urlImageContenido;
      this.contenido.languageContenido = this.form.value.languageContenido;
      this.contenido.listadereproduccion = this.form.value.listadereproduccion;

      if (this.edicion) {
        this.cS.update(this.contenido).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.contenido).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['administrator/list-movies']);
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
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idContenido: new FormControl(data.idContenido),
          titleContenido: new FormControl(data.titleContenido),
          descripContenido: new FormControl(data.descripContenido),
          yearContenido: new FormControl(data.yearContenido),
          directorContenido: new FormControl(data.directorContenido),
          typeContenido: new FormControl(data.typeContenido),
          genderContenido: new FormControl(data.genderContenido),
          originCountryContenido: new FormControl(data.originCountryContenido),
          urlContenido: new FormControl(data.urlContenido),
          urlImageContenido: new FormControl(data.urlImageContenido),
          languageContenido: new FormControl(data.languageContenido),
          listadereproduccion: new FormControl(data.listadereproduccion),
        });
      });
    }
  }
}


