import { Usuario } from './../../../models/usuario';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PromedioCalificacionDTO } from 'src/app/models/PromedioCalificacionDTO';
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
  resenasDTO: ResenaDTO[] = [];
  /*  ESTO ERA LA TABLA
  dataSource: MatTableDataSource<ResenaDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['usuario', 'texto', 'fecha']; */

  //====================================================
  form: FormGroup = new FormGroup({});
  resena: Resena = new Resena();
  mensaje: string = '';
  calificacion: string = '';
  constructor(
    private route: ActivatedRoute,
    private cS: ContenidoService,
    private rS: ResenaService,
    private clS: CalificacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private sanitizer: DomSanitizer
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

    /*    ESTO ERA CON LA TABLA
   this.rS.listResenasDeContenido(this.id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
  
    }); */
    this.rS.listResenasDeContenido(this.id).subscribe((data) => {
      this.resenasDTO = data;
    });

    this.clS.getPromedioCalificacion(this.id).subscribe((data) => {
      this.calificacion = data.map(data=>data.promedio_calificado)[0];
     
    });
    this.form = this.formBuilder.group({
      textResena: [''],
      dateResena: [''],
      usuario: [''],
      contenido: [''],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.resena.textResena = this.form.value.textResena;
      this.resena.dateResena = moment().toDate();
      this.resena.usuario.idUsuario = this.idParent;
      this.resena.contenido.idContenido = this.id;

      this.rS.insert(this.resena).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });

        //Llamar a esta funcion para que recargue nuevamente
        this.rS.listResenasDeContenido(this.id).subscribe((data) => {
          this.resenasDTO = data;
        });
        /*
         ESTO ES CON EL TABLE
        this.rS.listResenasDeContenido(this.id).subscribe(data=>{
          this.dataSource.data=data;//    ES LA UNICA FORMA DE ACTUALIZAR UN QUERY
        })
        */
      });
      //
      this.router.navigate([
        `/components/client/${this.idParent}/view-movies/${this.id}`,
      ]);
      this.snackbar.open('Comentario agregado', 'Agregado', { duration: 2000 });
      setTimeout(() => {
        this.form.reset();
      }, 0);
    } else {
      this.mensaje = 'Ingrese su comentario';
    }
  }

  obtenerControlCampo(nombreCampo: string) {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
