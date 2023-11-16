import { Component } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  form2: FormGroup = new FormGroup({});
  resena: Resena = new Resena();
  calificacion: Calificacion=new Calificacion();
  mensaje: string = '';
  promedio: string='';
  
  constructor(
    private route: ActivatedRoute,
    private cS: ContenidoService,
    private caS: CalificacionService,
    private rS: ResenaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar:MatSnackBar,
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

    this.rS.listResenasDeContenido(this.id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
  
    });
    this.caS.promediocalificaciondecontenido(this.id).subscribe((data) => {
      this.promedio = data[0].promedio_calificado;
    });

    this.form = this.formBuilder.group({
      textResena: [''],
      dateResena: [''],
      usuario: [''],
      contenido: [''],
    });
    this.form2 = this.formBuilder.group({
      usuario: [''],
      contenido: [''],
      score: [''],
    });
  }
  getVideoUrl(): SafeResourceUrl {
    const videoId = this.extractVideoIdFromUrl(this.movie.urlContenido);
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  private extractVideoIdFromUrl(url: string): string {
    // Utilizamos expresión regular para extraer el ID del video de la URL
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : '';
  }
  // Función auxiliar para extraer el ID del video de YouTube desde la URL
  aceptar() {
    if (this.form.valid) {
      this.resena.textResena = this.form.value.textResena;
      this.resena.dateResena = moment().toDate();
      this.resena.usuario.idUsuario = this.idParent;
      this.resena.contenido.idContenido = this.id;

      this.rS.insert(this.resena).subscribe((data) => {
         /*this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });*/
        this.rS.listResenasDeContenido(this.id).subscribe(data=>{
          this.dataSource.data=data;//    ES LA UNICA FORMA DE ACTUALIZAR UN QUERY
        })
      });
      this.router.navigate([
        `/components/client/${this.idParent}/view-movies/${this.id}`,
      ]);
      this.snackbar.open('Comentario agregado','Agregado',{duration:2000});
      setTimeout(() => {
        this.form.reset();
      }, 0);
    } else {
      this.mensaje = 'Ingrese su comentario ';
    }
    if (this.form2.valid) {
      this.calificacion.usuario.idUsuario = this.idParent;
      this.calificacion.contenido.idContenido = this.id;
      this.calificacion.score = this.form2.value.score;
      this.caS.insert(this.calificacion).subscribe(() => {
        this.caS.list().subscribe((data) => {
          this.caS.setList(data);
        });
      });
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
