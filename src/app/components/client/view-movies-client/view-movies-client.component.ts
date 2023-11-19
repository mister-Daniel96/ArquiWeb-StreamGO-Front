import { Usuario } from './../../../models/usuario';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Calificacion } from 'src/app/models/calificacion';
import { Contenido } from 'src/app/models/contenido';
import { Resena } from 'src/app/models/resena';
import { ResenaDTO } from 'src/app/models/resenaDTO';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { ContenidoService } from 'src/app/services/contenido.service';
import { ResenaService } from 'src/app/services/resena.service';
@Component({
  selector: 'app-view-movies-client',
  templateUrl: './view-movies-client.component.html',
  styleUrls: ['./view-movies-client.component.css'],
})
export class ViewMoviesClientComponent {
  id: number = 0;
  idParent: number = 0;
  movie: Contenido = new Contenido();

  //=================================================

  dataSource: MatTableDataSource<ResenaDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['usuario', 'texto', 'fecha'];
  //====================================================
  form: FormGroup = new FormGroup({});
  resena: Resena = new Resena();
  calificacion: Calificacion = new Calificacion(); //Calificacion
  formCalificacion: FormGroup = new FormGroup({});  //Calificacion
  calificaciones: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
    { value: 7, viewValue: '7' },
    { value: 8, viewValue: '8' },
    { value: 9, viewValue: '9' },
    { value: 10, viewValue: '10' },
  ];  //Calificacion
  mensaje: string = '';
  constructor(
    private route: ActivatedRoute,
    private cS: ContenidoService,
    private rS: ResenaService,
    private calS: CalificacionService, //Calificacion
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((data) => {
      this.idParent = data['id'];
    });
    this.route.params.subscribe((data) => {
      this.id = data['id'];
    });

    this.cS.listId(this.id).subscribe((data) => {
      this.movie = data;
    });

    this.rS.listResenasDeContenido(this.id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
  
    });
   
    this.form = this.formBuilder.group({
      textResena: ['',  Validators.required],
      dateResena: [''],
      usuario: [''],
      contenido: [''],
    });

    //Calificacion
    this.formCalificacion=this.formBuilder.group({
      score:['', Validators.required],
      contenido: [''],
      usuario: [''],
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.resena.textResena = this.form.value.textResena;
      this.resena.dateResena = moment().toDate();
      this.resena.usuario.idUsuario = this.idParent;
      this.resena.contenido.idContenido = this.id;

      this.rS.insert(this.resena).subscribe((data) => {
       /*  this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        }); */
        this.rS.listResenasDeContenido(this.id).subscribe(data=>{
          this.dataSource.data=data;//    ES LA UNICA FORMA DE ACTUALIZAR UN QUERY
        })
      });
//
      this.router.navigate([
        `/components/client/${this.idParent}/view-movies/${this.id}`,
      ]);
      this.snackbar.open('Comentario agregado','Agregado',{duration:2000});
      setTimeout(() => {
        this.form.reset();
      }, 0);
    } else {
      this.mensaje = 'Ingrese su comentario';
    }
  }

  //Calificacion obvio (lo dice ahi abajo :V)
  aceptarCalificacion(){
    if (this.formCalificacion.valid) {
      this.calificacion.score = this.formCalificacion.value.score;
      this.calificacion.contenido.idContenido = this.id;
      this.calificacion.usuario.idUsuario = this.idParent;

      this.calS.insert(this.calificacion).subscribe((data) => {
         this.calS.list().subscribe((data) => {
          this.calS.setList(data);
        });
      });
//
      this.router.navigate([
        `/components/client/${this.idParent}/view-movies/${this.id}`,
      ]);
      this.snackbar.open('Calificación agregada','Agregado',{duration:2000});
      setTimeout(() => {
        this.form.reset();
      }, 0);
    } else {
      this.mensaje = 'Ingrese una calificacion válida';
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
